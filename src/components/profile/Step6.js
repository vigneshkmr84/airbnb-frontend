import React from 'react'

/* step6:
picture */
const Step6 = ({ formData, setFormData }) => {

    const fileFormats = 'image/*, .heic';

    const handleSingleImgUpload = async (event) => {
        const file = event.target.files[0]
        console.log(file);
        var base64 = await convertBase64(file)
        setFormData({ ...formData, img: base64.split("base64,")[1] });
        // console.log(base64)

        /* const files = event.target.files
        console.log(files.length)
        files.map(async (file) => {
            console.log(file);
            const base64 = await convertBase64(file)
            setFormData({ ...formData, img: base64 });
        }) */
    }

    const handleMultipleImgUpload = async (event) => {
        const files = event.target.files
        console.log(files.length)
        files.map(async (file) => {
            console.log(file);
            const base64 = await convertBase64(file)
            setFormData({ ...formData, img: base64 });
        })
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

            {/* <div className='row'>
                <h6>Other pictures</h6>
            </div>
            <div className='row'>
                <div className='col'>
                    <input
                        className="form-control"
                        type='file'
                        accept={fileFormats}
                        multiple
                        onChange={e => handleMultipleImgUpload(e)}
                    ></input>
                </div>
                <div className='col'>
                    <button className='btn btn-danger'>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div> */}
        </div>
    )
}

export default Step6