export default function getDataFromAPI(method, requestBody, url, setLoading, setData) {
    setLoading(true);
    
    if (method == "POST") {
        const reqestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };
        fetch(url, reqestOptions)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
        })
    } else if (method == "GET") {
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setData(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error)
        });
    }
}