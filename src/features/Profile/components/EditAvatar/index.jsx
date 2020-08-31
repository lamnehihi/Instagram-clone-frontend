import React from "react";
import { EDIT_AVATAR } from "features/Profile/ProfileSlice";
import { useDispatch } from "react-redux";

function EditAvatar(props) {
  const dispatch = useDispatch();

  const HandleOnAvatarChange = (event) => {
    const image = event.target.files[0];
    console.log("avatar", image.name);
    const formData = new FormData();
    formData.append("image", image, image.name);

    dispatch(EDIT_AVATAR(formData));
  };
  return (
    <div className="EditAvatar">
      <input
        type="file"
        id="imageInput"
        onChange={HandleOnAvatarChange}
        hidden={true}
      />
    </div>
  );
}

export default EditAvatar;
