import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import { Loader } from "./index";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { upload } from "@testing-library/user-event/dist/upload";
import { saveItem } from "../utils/firebaseFunction";
import { useStateValue } from "../context/StateProvider";
import { getItems } from "../utils/firebaseFunction";
import { actionType } from "../context/reducer";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [img, setImg] = useState(null);
  const [fields, setFileds] = useState(false);
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [{}, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imgFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imgFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFileds(true);
        setMsg("Terjadi keslahan ketika mengunggah gambar: Mohon Ulangi");
        setAlertStatus("danger");
        setTimeout(() => {
          setFileds(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImg(downloadURL);
          setIsLoading(false);
          setFileds(true);
          setMsg("Berhasil menggunggah gambar");
          setAlertStatus("success");
          setTimeout(() => {
            setFileds(false);
          }, 4000);
        });
      }
    );
  };
  const deleteImg = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, img);
    deleteObject(deleteRef).then(() => {
      setImg(null);
      setIsLoading(false);
      setFileds(true);
      setMsg("Gambar Terhapus");
      setAlertStatus("success");
      setTimeout(() => {
        setFileds(false);
      }, 4000);
    });
  };
  const save = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !img || !price || !category) {
        setFileds(true);
        setMsg("Tolong isi kolom dengan lengkap");
        setAlertStatus("danger");
        setTimeout(() => {
          setFileds(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          category: category,
          price: price,
          qty: 1,
          calories: calories,
          imageURL: img
        };
        saveItem(data);
        setIsLoading(false);
        setFileds(true);
        setMsg("Berhasil menggunggah item");
        setAlertStatus("success");
        clear()
        setTimeout(() => {
          setFileds(false);
        }, 4000);
      }
    } catch (error) {
      setFileds(true);
      setMsg("Terjadi keslahan ketika mengunggah : Mohon Ulangi");
      setAlertStatus("danger");
      setTimeout(() => {
        setFileds(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData()
  };

  const clear = () => {
    setTitle("");
    setImg(null);
    setCalories("");
    setPrice("");
    setCategory(null);
  };

  const fetchData = async () => {
    await getItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    <div className="w-full min-h-screen h-auto flex items-center justify-center">
      <div
        className="w-[90%] md:w-[75%] border border-gray-800 rounded-lg p-4
      flex flex-col items-center justify-center gap-4"
      >
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold
            ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700"></MdFastfood>
          <input
            type="text"
            required
            value={title}
            name=""
            id=""
            placeholder="Nama..."
            onChange={(e) => setTitle(e.target.value)}
            className="capitalize h-full w-full text-lg  bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            name=""
            id=""
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Pilih Kategori
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-0 capitalize
                 bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div
          className="group flex justify-center items-center flex-col border-2 
        border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg"
        >
          {isLoading ? (
            <Loader></Loader>
          ) : (
            <>
              {!img ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700"></MdCloudUpload>
                      <p className="text-gray-500 hover:text-gray-700">
                        Unggah gambar yang sesuai....
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upoadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      typeof="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none
                  hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImg}
                    >
                      {" "}
                      <MdDelete className="text-white"></MdDelete>
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-2xl text-gray-700"></MdFoodBank>
            <input
              type="text"
              required
              placeholder="Kalori..."
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-2xl text-gray-700"></MdAttachMoney>
            <input
              type="number"
              required
              placeholder="Harga..."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="submit"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none
             bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={save}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
