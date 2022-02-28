import React, { useState, useEffect } from 'react'

const Meme = () => {
  const [meme, setMeme] = useState({
      topText: '',
      bottomText: '',
      randomImage: 'http://i.imgflip.com/1bij.jpg'
  })

  const [allMemeImage, setAllMemeImage] = useState([])

  const getAllMemesImage = async () => {
    const res =  await fetch(`https://api.imgflip.com/get_memes`)
    const data = await res.json()
    setAllMemeImage(data.data.memes)
  }

  useEffect(() => {
    getAllMemesImage();

  }, []) 

  
  function handleChange(event) {
      const { name, value } = event.target
      setMeme(prevMeme => (
        {
          ...prevMeme,
          [name]: value
        }
      ))
  }

  const getMemeImage = () => {
    let randNum = Math.floor(Math.random() * allMemeImage.length)
    let randImage = allMemeImage[randNum].url
    return setMeme(prevMeme => ({
       ...prevMeme,
       randomImage: randImage,
    }))
 }

  return (
    <main>
        <div className='form'>
            <input 
              className='form--input' 
              placeholder="top-text" 
              type="text" 
              name='topText'
              value={meme.topText}
              onChange={handleChange}
            />
            <input 
              className='form--input' 
              placeholder="bottom-text" 
              type="text" 
              value={meme.bottomText}
              name='bottomText'
              onChange={handleChange}
            />
            <button className='form--button' onClick={getMemeImage}>Get a new meme image 🖼</button>
        </div>
           <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
    </main>
  )
}

export default Meme