export async function defaulthandleResponse(
    response: Response, 
    message: string,
    toast?: ({ ...props }: any) => { id: string; dismiss: () => void; update: (props: any) => void; },
): Promise<{
    success: boolean;
    data: any[]
} | void> {
    if (response.status === 401) {
        return response.json().then((data) => {

            if (toast) {
                toast({
                    title: "Login failed",
                    description: message && data.message instanceof Error ? data.message.message : data.message,
                    variant: "destructive",
                });
            } else {
                alert(data.message);
            }
        });
    }
    if (!response.ok) {
        return response.json().then(data => {
            alert(`[connect.tsx] error getting data from the server, got an error with error ${data!.message}`)
            throw new Error(data.message || 'Failed to do requested action, ask youssef to give you more information about the problem');
        });
    }
    return response.json();
}

export async function sendRequest(
    route: String,
    message: any,
    method: 'POST'|'GET'|'PUT'|'REMOVE',
    toast?: ({ ...props }: any) => { id: string; dismiss: () => void; update: (props: any) => void; },
    errorMessage?: string,
): Promise<any> {
    let url = getURL(route);

    const options = {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
        }
    };

    // For GET requests, append parameters to URL
    if (method.toUpperCase() === 'GET' && message) {
        const params = new URLSearchParams();
        Object.entries(message).forEach(([key, value]) => {
            params.append(key, String(value));
        });
        url += `?${params.toString()}`;
    }
    // Add body for non-GET requests
    else if (method.toUpperCase() !== 'GET' && message) {
        options["body"] = JSON.stringify(message);
    }

    try {
        const resp = await fetch(url, options);
        return defaulthandleResponse(resp, errorMessage, toast);
    }
    catch(e) {
        console.error(e);
    }
}

function getURL(route: String) {
    const serverUrl = 'http://localhost:3000';
    return `${serverUrl}/${route}`;
}