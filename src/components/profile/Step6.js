import React from 'react'

/* step6:
picture */
const Step6 = ({ formData, setFormData, propertyImages, setPropertyImages }) => {

    const fileFormats = 'image/*, .heic';

    const handleSingleImgUpload = async (event) => {
        const file = event.target.files[0]
        console.log(file);
        var base64 = await convertBase64(file)
        setFormData({ ...formData, img: base64.split("base64,")[1] });
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const onClickAddButton = (e) => {
        console.log('add');
        if (propertyImages.length > 5) {
            console.log(propertyImages);
            window.alert('Max 5 images')
        } else {
            setPropertyImages(prevState => (
                [...prevState, { title: "", image: "" }]
            ))
        }
    }

    const handleChange = (e, i) => {
        console.log('changing...')
        const { name, value } = e.target;
        console.log(name, value)
        let images = [...propertyImages];
        images[i] = { ...images[i], [name]: value };
        setPropertyImages(images)
    }


    const handleImageUpload = (e,i) =>{

    }
    return (
        <div>
            <div className='row'>
                <h6>Upload Main picture</h6>
            </div>
            <div className='row'>
                <div className='col'>
                    <input
                        className="form-control"
                        type='file'
                        accept={fileFormats}
                        onChange={e => handleSingleImgUpload(e)}
                    ></input>
                </div>
                {/* <div className='col'>
                    <button className='btn btn-danger'>
                        <i className="bi bi-trash"></i>
                    </button>
                </div> */}
            </div>

            <div className='row'>
                <h6>Other pictures</h6>
            </div>
            {propertyImages?.map((el, index) => {
                return (
                    <div className='row' key={index}>
                        <input className="form-control w-25"
                            placeholder={`Title ${index + 1}`}
                            type="text"
                            name='title'
                            value={el.title}
                            required
                            onChange={e => handleChange(e, index)}
                        />
                        <div className='col'>
                            <input
                                className="form-control"
                                type='file'
                                placeholder={`Upload image ${index + 1}`}
                                accept={fileFormats}
                                name='image'
                                value={el.image}
                                onChange={e => handleImageUpload(e, index)}
                            ></input>
                        </div>
                    </div>
                )
            })}
            {/* <div className='row'>
                <input className="form-control w-25"
                    placeholder='Image 1'
                    type="text"
                    required
                />
                <div className='col'>
                    <input
                        className="form-control"
                        type='file'
                        accept={fileFormats}
                        multiple
                        onChange={e => handleMultipleImgUpload(e)}
                    ></input>
                </div>
            </div> */}

            <div className='row' style={{ justifyContent: 'center', textAlign: 'center' }}>
                <button
                    className='btn btn-primary w-25'
                    style={{ alignItems: 'center' }}
                    onClick={(e) => onClickAddButton(e)}>
                    <i className="bi bi-plus-lg" /> &nbsp;Add
                </button>
            </div>
        </div>
    )
}

export default Step6