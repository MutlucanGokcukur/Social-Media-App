import { defineStore } from 'pinia';
import { apiBaseURL } from '@/config/config';
import { useUserStore } from "../user";

export const useFeedSocket =defineStore(
{
    id   : 'feedSocket',
    state: () =>
    ({
        socket      : null,
        isConnected : false,
        receivedData: null,
        userStore : useUserStore(),
    }),

    actions:
    {
        connectSocket()
        {
            if(!this.socket)
            {
                const wsURL = `ws://${apiBaseURL.host.replace(/^https?:\/\//, '')}:${apiBaseURL.port}/ws/post/`;
                this.socket = new WebSocket(`${wsURL}?uuid=${this.userStore.user.id}`);

                this.socket.onopen = () => 
                {
                    console.log("✅ Feed WebSocket bağlantısı kuruldu.");
                    this.isConnected = true;
                };

                this.socket.onmessage = (event) => 
                {
                    try 
                    {
                        const receivedData = JSON.parse(event.data);
                        this.receivedData = receivedData;
                    } 
                    catch (error) 
                    {
                        console.error("❌ Feed JSON parse hatası:", error);
                    }
                };

                this.socket.onerror = (error) =>
                {
                    console.error("❌ Feed WebSocket hatası:", error);
                    this.isConnected = false;
                };

                this.socket.onclose = () => 
                {
                    console.warn("⚠️ Feed WebSocket bağlantısı kapandı.");
                    this.isConnected = false;
                    this.socket = null;
                    setTimeout(() => 
                    {
                        console.log("🔄 Feed WebSocket tekrar bağlanıyor...");
                        this.connectSocket();
                    }, 5000);
                };

            }
        },

        sendMessage(data) 
        {
            if (this.socket && this.isConnected) 
            {
                this.socket.send(JSON.stringify(data));
                console.log("📤 Mesaj gönderildi:", data);
            } 
            else 
            {
                console.warn("⚠️ WebSocket bağlantısı yok, mesaj gönderilemedi.");
            }
        },

        disconnectSocket() 
        {
            if (this.socket) 
            {
                this.socket.close();
                this.socket = null;
                this.isConnected = false;
                console.log("🔌 WebSocket bağlantısı kapatıldı.");
            }
        },
    }
})