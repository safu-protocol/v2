const https = require('https');

export default async function handler(req: any, res: any) {
    let tokenAddress = req.query.tokenAddress || "not defined";
    res.status(200).json({
        name: 'John Doe',
        tokenAddress: tokenAddress
    });
}
