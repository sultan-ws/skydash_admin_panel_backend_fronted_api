import React, { useContext, useEffect, useState } from "react"
import { mainContext } from "../Context"
import Header from "../Common/Header"
import Sidebar from "../Common/Sidebar"
import Footer from "../Common/Footer"
import prev from "../img/generic-image-file-icon-hi.png"
import { useNavigate, useParams } from "react-router"
import { ToastContainer, toast } from "react-toastify"
import axios, { toFormData } from "axios"

function Addslider() {
  let { changemenu } = useContext(mainContext)

  let [formSubmit, setFormSubmit] = useState(false)
  let navigation = useNavigate()
  let params = useParams()
  let [inputslider, setInputslider] = useState({
    Slider_Heading: "",
    Slider_SubHeading: "",
    Slider_Image: "",
    slider_status: "",
  })
  console.log(inputslider)
  let sliderHandler = (event) => {
    event.preventDefault()

    if (event.target.slider_status.value == "") {
      var status = 1
    } else {
      var status = event.target.slider_status.value
    }
    let form = new FormData(event.target)

    let dataSave = {
      Slider_Heading: form.get("Slider_Heading"),
      Slider_SubHeading: form.get("Slider_SubHeading"),
      status: status,
    }

    if (form.get("slider_image") != "") {
      dataSave.image = form.get("slider_image")
    }
    if (params.slider_id == undefined) {
      axios
        .post(
          "http://localhost:5000/api/backend/sliders/add",
          toFormData(dataSave)
        )
        .then((result) => {
          if (result.data.status == true) {
            toast.success(result.data.message)
            setFormSubmit(true)
          } else {
            toast.error(result.data.message)
          }
          console.log(result.data)
        })
        .catch((error) => {
          toast.error("something went wrong")
          console.log(error)
        })
    } else {
      dataSave.id = params.course_id
      axios
        .put(
          "http://localhost:5000/api/backend/courses/update",
          toFormData(dataSave)
        )
        .then((result) => {
          if (result.data.status == true) {
            toast.success(result.data.message)
            setFormSubmit(true)
          } else {
            toast.error(result.data.message)
          }
          console.log(result.data)
        })
        .catch((error) => {
          toast.error("something went wrong")
          console.log("something went wrong")
        })
    }
  }

  useEffect(() => {
    if (formSubmit == true) {
      navigation("/viewslider")
    }
  }, [formSubmit])

  let inputHander = (event) => {
    let data = { ...inputslider }
    data[event.target.name] = event.target.value
    setInputslider(data)
  }
  return (
    <div>
      <Header />
      <ToastContainer />

      <div className="flex  bg-[#F5F7FF]">
        <Sidebar />

        <div
          className={` ${
            changemenu == true ? "w-[95%]" : "w-[84%]"
          } relative px-[30px] pt-[20px] pb-[60px]  bg-[#F5F7FF]`}
        >
          <h1 className="text-[25px] font-[500] mb-[10px]">Slider</h1>
          <div className="">
            <div className="bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]">
              <form onSubmit={sliderHandler}>
                Slider Heading
                <input
                  name="Slider_Heading"
                  onChange={inputHander}
                  value={inputslider.Slider_Heading}
                  type="text"
                  className="border border-gray-400 px-4 w-full h-[50px] mb-3 mt-2 "
                />
                Slider Sub-Heading
                <input
                  value={inputslider.Slider_SubHeading}
                  name="Slider_SubHeading"
                  onChange={inputHander}
                  type="text"
                  className="border border-gray-400 w-full h-[50px] mb-3 mt-2 px-4 "
                />
                Slider_Image
                <input
                  name="Slider_Image"
                  type="file"
                  id="file-input"
                  className="border hidden border-gray-400 w-full h-[50px] mb-1 mt-2 "
                />
                <div className="flex items-center gap-0 mt-[3px]">
                  <div className="w-full flex items-center">
                    <input
                      type="text"
                      readOnly
                      placeholder="Upload File"
                      className=" px-4 rounded-[10px_0px_0px_10px] border border-gray-400 w-[70%] h-[50px]"
                    />
                    <label
                      id="file-input-label"
                      for="file-input"
                      className="border block  bg-[#4B49AC] text-white text-center leading-[50px]  w-[10%] rounded-[0px_20px_20px_0px] h-[50px]  "
                    >
                      Upload
                    </label>
                  </div>
                  <div className="">
                    <img src={prev} alt="" className="w-[80px] h-[80px]" />
                  </div>
                </div>
                Slider Stauts
                <div className="flex items-center mt-5  mb-8 gap-2">
                  <input
                    type="radio"
                    value="1"
                    name="slider_status"
                    className="mx-2 w-[20px] h-[20px] text-[20px]"
                    onChange={inputHander}
                    checked={inputslider.slider_status == 1 ? "checked" : ""}
                  />{" "}
                  Active
                  <input
                    type="radio"
                    className="mx-2 w-[20px] h-[20px] text-[20px]"
                    onChange={inputHander}
                    name="slider_status"
                    value="0"
                    checked={inputslider.slider_status == 0 ? "checked" : ""}
                  />{" "}
                  Deactive
                </div>
                <input
                  type="submit"
                  value={params.slider_id == undefined ? "Submit" : "Update"}
                  className="bg-[#4B49AC] mb-8 mt-7 text-[18px] px-8 py-2 rounded-[10px] text-white"
                />
                <input
                  type="reset"
                  value="Cancel"
                  className="bg-[#F8F9FA] ml-4  text-[18px] px-8 py-2 rounded-[10px] text-black"
                />
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Addslider
