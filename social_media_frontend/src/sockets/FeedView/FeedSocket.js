import { apiBaseURL } from '@/config/config';

export function feedPostSocketFunctionalities(addNewPost) 
{
    //#region WebSocket Initialization
    const wsURL          = `ws://${apiBaseURL.host.replace(/^https?:\/\//, '')}:${apiBaseURL.port}/ws/post/`;
    const socket         = new WebSocket(wsURL);
    //#endregion
    //#region WebSocket Event Handlers
    //#region onmessage
    socket.onmessage = function(event) 
    {
        const data = JSON.parse(event.data);
        const action = data.action;

        if (action === 'created')
        {
            addNewPost(data.post);
        }
    };
    //#endregion
    //#region onopen
    socket.onopen = function() 
    {
        console.log("WebSocket connection established.");
    };
    //#endregion
    //#region onerror
    socket.onerror = function(error) 
    {
        console.error("WebSocket error observed:", error);
    };
    //#endregion
    //#region onclose
    socket.onclose = function() 
    {
        console.log("WebSocket connection closed.");
    };
    //#endregion
    //#endregion
    return socket;
}
