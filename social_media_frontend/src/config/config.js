//* Sunucu yapılandırma ayarları
export const serverConfig   = 
{
    host                    : '192.168.1.110',   //! Vite sunucusunun çalıştığı IP adresi
    port                    : 8080,              //! Vite sunucusunun çalıştığı port numarası
    hmr                     : 
    {
        host                : '192.168.1.110',   //! HMR (Hot Module Replacement) için kullanılacak IP adresi
        clientPort          : 8080,              //! HMR istemci portu
    },
    watch                   : 
    {
        usePolling          : true,   // Dosya değişikliklerini polling yöntemi ile izle
        interval            : 300,    // Polling kontrol aralığı (milisaniye cinsinden)
    },
};

//* API temel URL yapılandırma ayarları
export const apiBaseURL     = 
{
    host                    : 'http://192.168.1.110',  //! API sunucusunun çalıştığı IP adresi
    port                    : 8000,                    //! API sunucusunun çalıştığı port numarası
}
