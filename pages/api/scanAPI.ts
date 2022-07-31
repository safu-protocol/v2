const https = require("https");

async function loadToken(tokenAddress: string) {
    return new Promise((resolve, reject) => {
        let url = "https://fomo.tech/api/info?address=" + tokenAddress;

        https.get(url, (resp: any) => {
            let data = "";

            // Chunk of data
            resp.on("data", (chunk: any) => {
                data += chunk;
            });

            resp.on("end", () => {
                console.log(data);
                if (data == "Non valid Token Address!") {
                    resolve("Non valid Token Address!");
                }
                else {
                    resolve(JSON.parse(data));
                }
            });

        }).on("error", (err: any) => {
            console.log("Error: " + err.message);
            reject({ "error": err.message });
        });
    });
}

export default async function handler(req: any, res: any) {
    return new Promise((resolve: any, reject: any) => {
        loadToken(req.query.tokenAddress)
            .then(response => {
                console.log(response);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Cache-Control", "max-age=100");
                res.end(JSON.stringify(response));
                resolve();
            })
            .catch(error => {
                res.json(error);
                res.status(405).end();
                return resolve();
            })
    });
}