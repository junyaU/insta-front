<template>
  <div class="image-wrapper">
    <div class="preview-wrapper">
      <label for="image-input">
        <p class="non-image">+</p>
      </label>
      <img src="~/assets/image/delete_img_button.png" class="delete-image" @click="deleteImage">
    </div>
    <input id="image-input" type="file" name="Image" @change="showPreview" required>
    <p>pngファイルを選択してください。</p>
  </div>
</template>

<script>
export default {
  methods: {
    showPreview(e){
      const file = e.target.files[0];
      const fileReader = new FileReader();
      const previewPlace = document.querySelector(".preview-wrapper");
      const previewImage = document.querySelector("preview-image");
      const nonImage = document.querySelector(".non-image");
      const deleteButton = document.querySelector(".delete-image");

      //既に画像があれば削除
      if(previewImage){
        previewPlace.removeChild(previewImage);
      }

      fileReader.onload = (e) => {
        const imgDom = document.createElement("img");
        imgDom.setAttribute("src", fileReader.result);
        imgDom.setAttribute("class", "preview-image");
        imgDom.style.width = "100%";
        imgDom.style.height = "100%";

        previewPlace.appendChild(imgDom)
      }

      nonImage.style.display = "none";
      deleteButton.style.display =  "inline";
      previewPlace.style.border = "solid 1px";

      fileReader.readAsDataURL(file)
    },

    deleteImage(){
      const previewPlace = document.querySelector(".preview-wrapper");
      const previewImage = document.querySelector(".preview-image");
      const deleteButton = document.querySelector(".delete-image");
      const inputImage = document.querySelector("#image-input");
      const nonImage = document.querySelector(".non-image");

      if(previewImage){
        previewPlace.removeChild(previewImage);
        inputImage.value = "";
        deleteButton.style.display = "none";
        nonImage.style.display = "inline";
      }
    }
  },
}
</script>


<style scoped>
  .image-wrapper{
    margin: 0 auto;
    margin-bottom: 10px;
  }

  .preview-wrapper{
    border: dashed 2px #000000;
    width: 250px;
    height: 250px;
    margin: 0 auto;
    position: relative;
  }

  .non-image{
    font-weight: bold;
    font-size: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .delete-image{
    position: absolute;
    display: none;
    top: 2%;
    right: 2%;
    font-size: 20px;
    width: 20px;
    height: 20px;
  }

  #image-input{
    display: none;
  }

  @media screen and (min-width:320px) and (max-width:414px){
    .preview-wrapper{
      width: 200px;
      height: 200px;
    }
  }
</style>
