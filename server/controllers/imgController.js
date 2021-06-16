const Img = require('../models/imgModel')
const User = require('../models/userModel')
const request = require('request');

const requestApi = (data) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: "GET",
            url: 'https://api.nasa.gov/planetary/apod?api_key=AxYmZ2SvB2PTSWPxZAiityAhRqk4cgPndlrKE6YU'

        }
        request(options, (err, res, body) => {
            if (err)
                reject(err)

            else {
                resolve(body)
            }
        })
    })
}

const addImgBySite = async (req, res) => {
    try {
        const image = await requestApi();
        const addImg = new Img(JSON.parse(image));
        console.log(addImg);
        addImg.userId = req.body.userId;
        addImg.save();

        await User.findByIdAndUpdate(req.body.userId, { $push: { images: addImg._id } })
        res.status(201).json({ image: addImg })
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`)
    }
}

const getImages = (req, res) => {
    User.findById({ _id: req.params.userId })
        .populate({ path: 'images', select: 'title url' })
        .then(user => {
            res.status(200).json({ userImage: user.images })
        }).catch(e => { res.status(500).send(`Error....: ${e}`) })
}



const addComputer = (req, res) => {
    console.log('addComputer------------------------');
    const addImage = new Img(req.body);

    addImage.save()
        .then(image => {
            User.findOneAndUpdate({ _id: req.body.userId }, { $push: { images: addImage._id } })
                .then(
                    res.status(200).json({ Images: image }),
                    console.log(image))
        }).catch(e => { console.log(`Errrorrrrrrrrr    ${e}`); res.status(500).send(`Error....: ${e}`) })
}

module.exports = { addImgBySite, getImages, addComputer }