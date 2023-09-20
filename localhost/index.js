
canva = document.getElementById('canva')

const settings = {
    "async": true,
    "crossDomain": true,
    "method": "GET",
  };
  
  let video;
  
  fetch('https://oraculo.cin.ufpe.br/alphaction/video', settings)
      .then((data) => data.blob())
      .then((myBlob) => {
        console.log('passou aqui')
        video = document.getElementById('video');
        const urlVideo = URL.createObjectURL(myBlob);
        video.src = urlVideo;
        console.log('tudo ok')
      })
      .catch(error => {
        console.error('Error:', error);
      });