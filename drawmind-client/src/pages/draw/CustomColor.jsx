import {FaCheck} from "react-icons/fa";
import {useState} from "react";
import ColorModal from "./ColorModal.jsx";

function CustomColor({config, setConfig, isErasing, setErasing}) {

    const [isClicked, setIsClicked] = useState(false);
    const [pickerBgColor, setPickerBgColor] = useState({red: 255, green: 255, blue: 255, hex: '#FFFFFF'});

    return (
        <>
            <div
                className="color"
                style={{
                    backgroundColor: pickerBgColor.hex,
                    position: 'relative',
                }}
                onClick={() => {
                    setIsClicked(true);
                    setErasing(false)
                }}
            >
                <FaCheck className="paletteIcon" style={{
                    position: 'absolute',
                    display: config.strokeStyle === pickerBgColor.hex && !isErasing ? 'block' : 'none',
                    color: config.strokeStyle === '#FFFF00' ? 'black' : 'white',
                }}/>
            </div>
            <ColorModal
                isClicked={isClicked}
                setIsClicked={setIsClicked}
                pickerBgColor={pickerBgColor}
                setPickerBgColor={setPickerBgColor}
                setConfig={setConfig}
            ></ColorModal>
        </>
    )
}

export default CustomColor
