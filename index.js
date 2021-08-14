const app = require('express')();
const cors = require('cors')
const axios = require('axios').default
const bodyParser = require('body-parser')
const notify = axios.create({
    baseURL: `https://notify-api.line.me/api/notify`,
    headers: {
        Authorization: `Bearer 7Op8i9Z0LSgisi4lkJdtXzZgl64APzR8el5xVoWhjoZ`,
        [`Content-Type`]: `application/x-www-form-urlencoded`
    }
})
app.use(cors());
app.use(bodyParser());

app.post('/notify', async (req, res) => {
    try {
        const body = new URLSearchParams();
        body.append('message', req.body.message)

        await notify.post(
            '/',
            body
        )

        return res.sendStatus(200);
    } catch (error) {
        console.log(error.response.data);
        return res.status(error.response.data.status).json(error.response.data)
    }
})

app.listen(3000, () => console.log(`App started`))