import React, { useState } from "react";

import { generateBase64FromImage } from "../../utils/imagePreview";

const Test = () => {
  const [image, setImage] = useState();
  return (
    <>
      <input
        id="avatar"
        onChange={async (e) => {
          generateBase64FromImage(e.target.files[0])
            .then((b64) => {
              setImage(b64);
            })
            .catch((e) => {
              setImage(null);
            });
        }}
        name="avatar"
        type="file"
        accept="image/png, image/jpeg"
      />
      <div className="preview border w-fit ">
        <img src={image} className="h-[20rem] p-1" />
      </div>
    </>
  );
};

export default Test;
