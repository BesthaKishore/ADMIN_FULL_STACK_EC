import React, { useState } from 'react'

import { assets } from "../../assets/assets.js"

import { BACKEND_URL } from '../../App.jsx';

import { toast } from 'react-toastify';

import axios from "axios";

import "./index.css"

const AdminAddItemms = ({ token }) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Women");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestSeller] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData()

      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(
        BACKEND_URL + "/api/product/add",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if(response.data.success){
        toast.success(response.data.message);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName('');
        setDescription('');
        setPrice('');
        setCategory('Men');
        setSubCategory('Women');
        setSizes([]);
        setBestSeller(false);
      }else{
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <form className='Add_Items_main_container' onSubmit={onSubmitHandler}>

      <div className='upload_image_container'>
        <p className='upload_heading'>Upload Image</p>

        <div className='upload_image_card_section'>

          <label htmlFor='image1'>
            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="upload_area" className='upload_image' />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" className='upload_image_file' />
          </label>

          <label htmlFor='image2'>
            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="upload_area" className='upload_image' />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" className='upload_image_file' />
          </label>

          <label htmlFor='image3'>
            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="upload_area" className='upload_image' />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" className='upload_image_file' />
          </label>

          <label htmlFor='image4'>
            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="upload_area" className='upload_image' />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" className='upload_image_file' />
          </label>

        </div>

        <div className='Product_name_container'>
          <p className='upload_heading'>Product name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} type='text' required placeholder='Type here' className='Product_name_input' />
        </div>

        <div className='Product_name_container'>
          <p className='upload_heading'>Product description</p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} required placeholder='Write content here' className='Product_name_input' ></textarea>
        </div>

        <article className='Category_subCategory_price_container'>

          <div className='category_section_container'>
            <p className='upload_heading'>Product category</p>
            <select onChange={(e) => setCategory(e.target.value)} className='select_method'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className='category_section_container'>
            <p className='upload_heading'>Sub category</p>
            <select onChange={(e) => setSubCategory(e.target.value)} className='select_method'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div className='category_section_container'>
            <p className='upload_heading'>Product category</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} type='number' className='select_method' required placeholder='25' />
          </div>

        </article>

        <div className='Product_name_container'>
          <p className='upload_heading'>Product Sizes</p>

          <div className='size_Main_container'>

            <div className='size_card_container' onClick={() => setSizes((prev) => prev.includes("S") ? prev.filter((items) => items !== "S") : [...prev, "S"])}>
              <p className={`size_para ${sizes.includes("S") ? "size_select_bg" : "size_not_select_bg"}`}>S</p>
            </div>

            <div className='size_card_container' onClick={() => setSizes((prev) => prev.includes("M") ? prev.filter((items) => items !== "M") : [...prev, "M"])}>
              <p className={`size_para ${sizes.includes("M") ? "size_select_bg" : "size_not_select_bg"}`}>M</p>
            </div>

            <div className='size_card_container' onClick={() => setSizes((prev) => prev.includes("L") ? prev.filter((items) => items !== "L") : [...prev, "L"])}>
              <p className={`size_para ${sizes.includes("L") ? "size_select_bg" : "size_not_select_bg"}`}>L</p>
            </div>

            <div className='size_card_container' onClick={() => setSizes((prev) => prev.includes("XL") ? prev.filter((items) => items !== "XL") : [...prev, "XL"])}>
              <p className={`size_para ${sizes.includes("XL") ? "size_select_bg" : "size_not_select_bg"}`}>XL</p>
            </div>

            <div className='size_card_container' onClick={() => setSizes((prev) => prev.includes("XXL") ? prev.filter((items) => items !== "XXL") : [...prev, "XXL"])}>
              <p className={`size_para ${sizes.includes("XXL") ? "size_select_bg" : "size_not_select_bg"}`}>XXL</p>
            </div>

          </div>
        </div>

        <div className='add_bestSeller_container'>
          <input
            onChange={() => setBestSeller((prev) => !prev)}
            checked={bestseller} type="checkbox" id="BestSeller"
            className='checkbox' />
          <label className='Best_lable' htmlFor='BestSeller'>Add to bestseller</label>
        </div>

        <button type="submit" className='Add_btn'>Add</button>
      </div>
    </form>
  )
}

export default AdminAddItemms
