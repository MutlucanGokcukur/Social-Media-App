import  { apiBaseURL } from '@/config/config';

export function PostSocket(addNewPost) 
{
    const wsURL          = `ws://${apiBaseURL.host.replace(/^https?:\/\//, '')}:${apiBaseURL.port}/ws/post/`;
    const socket         = new WebSocket(wsURL);

    socket.onmessage = function(event) 
    {
        const data = JSON.parse(event.data);
        const action = data.action;

        if (action === 'created')
        {
            addNewPost(data.post);
        }
    };

    socket.onopen = function() 
    {
        console.log("WebSocket connection established.");
    };
    
    socket.onerror = function(error) 
    {
        console.error("WebSocket error observed:", error);
    };
    
    socket.onclose = function() 
    {
        console.log("WebSocket connection closed.");
    };

    return socket;
}
