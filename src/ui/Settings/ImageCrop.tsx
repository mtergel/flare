import Button from "@/components/Button/Button";
import Slider from "@/components/Slider/Slider";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "utils/cropImage";

interface ImageCropProps {
  image: string;
  onFinish: (base64: string) => any;
}
const ImageCrop: React.FC<ImageCropProps> = ({ image, onFinish }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleUpload = useCallback(async () => {
    const baseString = await getCroppedImg(image, croppedAreaPixels);
    onFinish(baseString);
  }, [croppedAreaPixels, image, onFinish]);

  return (
    <div>
      {/* todo make these dynamic? */}
      <div className="w-[300px] h-[300px] relative bg-black">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          onCropComplete={onCropComplete}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          objectFit="vertical-cover"
        />
      </div>
      <div>
        <div className="bg-paper p-4">
          <Slider
            min={1}
            max={4}
            step={0.5}
            onValueChange={(val) => setZoom(val[0])}
            name="zoom"
            value={[zoom]}
          />
        </div>
        <div className="bg-base flex items-center justify-center py-4">
          <Button color="primary" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageCrop;
