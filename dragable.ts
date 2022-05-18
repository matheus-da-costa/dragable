dragable() {
    let dragImgMouseStart = {x: 0, y: 0};
    let lastDiff = {x: 0, y: 0};
    let initialPos = this.selectedImage.nativeElement.getBoundingClientRect();
    let currentPos = {x: -initialPos.width/2, y:0};
    let imageProperties = {width: null, height: null};
	let containerProperties = {width: null, height: null};
    let divImage = document.getElementById('divImage');
    let newPotions = {width: null, height: null};

    let containerStyle = getComputedStyle(divImage);
    imageProperties.width = this.width
	  imageProperties.height = this.height
	  containerProperties.width = parseInt(containerStyle.width)
	  containerProperties.height = parseInt(containerStyle.height)

    const mousedownDragImg = (e) => {
      e.preventDefault();
      dragImgMouseStart.x = e.clientX;
      dragImgMouseStart.y = e.clientY;
      currentPos.x += lastDiff.x;
      currentPos.y += lastDiff.y;
      lastDiff = {x: 0, y: 0};
      window.addEventListener('mousemove', mousemoveDragImg);
      window.addEventListener('mouseup', mouseupDragImg);
    }

    const mousemoveDragImg = (e) => {
      e.preventDefault();
      lastDiff.x = e.clientX - dragImgMouseStart.x;
      lastDiff.y = e.clientY - dragImgMouseStart.y;
      newPotions = { width: currentPos.x + lastDiff.x, height: currentPos.y + lastDiff.y };
      window.requestAnimationFrame(
        function() {

          // Left Border
          if (newPotions.width > 1) {
            newPotions.width = 0
			    	currentPos.x = 0
          }

          // Right Border
          if (newPotions.width < ( containerProperties.width - imageProperties.width )) {
            newPotions.width = containerProperties.width - imageProperties.width
            currentPos.x = containerProperties.width - imageProperties.width
          }

          // Top Border
          if (newPotions.height > 1) {
            newPotions.height = 0
            currentPos.y = 0
          }

          // Bottom Border
          if (newPotions.height < containerProperties.height - imageProperties.height) {
            newPotions.height = containerProperties.height - imageProperties.height
            currentPos.y = containerProperties.height - imageProperties.height
          }

        }
      );
        this.renderer.setStyle(this.selectedImage.nativeElement, 'transform',`translate(${newPotions.width}px, ${newPotions.height}px)` );
    }

    const mouseupDragImg = (e) => {
      e.preventDefault();
      // console.log(currentPos.x + lastDiff.x)

      window.removeEventListener('mousemove', mousemoveDragImg);
      window.removeEventListener('mouseup', mouseupDragImg);
    }

    this.selectedImage.nativeElement.addEventListener('mousedown', mousedownDragImg);

  }
