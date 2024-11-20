import '../../css/ColorModal.css'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useEffect, useRef, useState} from "react";

const pattern = [[0, 1, 0], [-1, 0, 0], [0, 0, 1], [0, -1, 0], [1, 0, 0], [0, 0, -1]]

function ColorModal({config, setConfig, pickerBgColor, setPickerBgColor, isClicked, setIsClicked}) {
    const colorPickerRef = useRef(null);
    const sliderRef = useRef(null)

    const isPickerDraggingRef = useRef(false)
    const isSliderDraggingRef = useRef(false)

    const [pickerButtonOffset, setPickerButtonOffset] = useState({offsetX: 0, offsetY: 0})
    const [sliderButtonOffset, setSliderButtonOffset] = useState(0)

    const [sliderBgColor, setSliderBgColor] = useState({red: 255, green: 0, blue: 0, hex: '#FF0000'});

    const [mouseOffset, setMouseOffset] = useState({offsetX: 0, offsetY: 0});

    function makeColorPicker() {
        if (colorPickerRef.current) {
            colorPickerRef.current.width = 256;
            colorPickerRef.current.height = 256;
            const colorPickerContext = colorPickerRef.current.getContext("2d");
            for (let i = 0; i < 256; i++) {
                for (let j = 0; j < 256; j++) {
                    const red = (1 - j / 255) * (255 - i * (255 - sliderBgColor.red) / 255)
                    const green = (1 - j / 255) * (255 - i * (255 - sliderBgColor.green) / 255)
                    const blue = (1 - j / 255) * (255 - i * (255 - sliderBgColor.blue) / 255)
                    colorPickerContext.fillStyle = `rgb(${red}, ${green}, ${blue})`;
                    colorPickerContext.fillRect(i, j, 1, 1);
                }
            }
        }
    }

    function makeSlider() {
        if (sliderRef.current) {
            sliderRef.current.width = 25
            sliderRef.current.height = 256
            const context = sliderRef.current.getContext("2d");
            const rgb = [255, 0, 0]
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 256; j++) {
                    context.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
                    context.fillRect(0, (i * 256 + j) / 6, 25, 1);
                    for (let k = 0; k < 3; k++)
                        rgb[k] += pattern[i][k]
                }
            }
        }
    }

    useEffect(() => {
        if (isClicked) {
            makeColorPicker()
            makeSlider()
            setConfig({...config, strokeStyle: pickerBgColor.hex})
        }
    }, [isClicked]);

    useEffect(() => {
        if (isClicked) {
            makeColorPicker()
        }
    }, [sliderBgColor])

    useEffect(() => {
        if (isPickerDraggingRef.current) {
            document.addEventListener('mousemove', handlePickerDrag);
            document.addEventListener('mouseup', handlePickerDrop);
        } else {
            document.removeEventListener('mousemove', handlePickerDrag);
            document.removeEventListener('mouseup', handlePickerDrop);
        }

        return () => {
            document.removeEventListener('mousemove', handlePickerDrag);
            document.removeEventListener('mouseup', handlePickerDrop);
        }
    }, [isPickerDraggingRef.current]);

    useEffect(() => {
        if (isSliderDraggingRef.current) {
            document.addEventListener('mousemove', handleSliderDrag);
            document.addEventListener('mouseup', handleSliderDrop);
        } else {
            document.removeEventListener('mousemove', handleSliderDrag);
            document.removeEventListener('mouseup', handleSliderDrop);
        }

        return () => {
            document.removeEventListener('mousemove', handleSliderDrag);
            document.removeEventListener('mouseup', handleSliderDrop);
        }
    }, [isSliderDraggingRef.current]);

    function handlePickerDrag(e) {
        if (!isPickerDraggingRef.current)
            return

        let diffX = pickerButtonOffset.offsetX + e.clientX - mouseOffset.offsetX;
        let diffY = pickerButtonOffset.offsetY + e.clientY - mouseOffset.offsetY;

        if (diffX < 0) diffX = 0
        else if (diffX > 255) diffX = 255
        if (diffY < 0) diffY = 0
        else if (diffY > 255) diffY = 255

        setPickerButtonOffset({offsetX: diffX, offsetY: diffY});
        setMouseOffset({offsetX: e.clientX, offsetY: e.clientY});
    }

    function handlePickerDrop() {
        isPickerDraggingRef.current = false
    }

    useEffect(() => {
        if (colorPickerRef.current) {
            const context = colorPickerRef.current.getContext('2d')
            const pixel = context.getImageData(pickerButtonOffset.offsetX, pickerButtonOffset.offsetY, 1, 1).data
            const hex = `#${pixel[0] < 16 ? '0' : ''}${pixel[0].toString(16)}${pixel[1] < 16 ? '0' : ''}${pixel[1].toString(16)}${pixel[2] < 16 ? '0' : ''}${pixel[2].toString(16)}`
            setPickerBgColor({
                red: pixel[0],
                green: pixel[1],
                blue: pixel[2],
                hex: hex
            })
            setConfig({...config, strokeStyle: hex})
        }
    }, [pickerButtonOffset, sliderBgColor]);

    function handleSliderDrag(e) {
        if (!isSliderDraggingRef.current)
            return

        let diffY = sliderButtonOffset + e.clientY - mouseOffset.offsetY;

        if (diffY < 0) diffY = 0
        else if (diffY > 255) diffY = 255

        setSliderButtonOffset(diffY);
        setMouseOffset({offsetX: e.clientX, offsetY: e.clientY});
    }

    function handleSliderDrop() {
        isSliderDraggingRef.current = false
    }

    useEffect(() => {
        if (sliderRef.current) {
            const context = sliderRef.current.getContext('2d')
            const pixel = context.getImageData(0, sliderButtonOffset, 1, 1).data
            setSliderBgColor({
                red: pixel[0],
                green: pixel[1],
                blue: pixel[2],
                hex: `#${sliderBgColor.red < 16 ? '0' : ''}${sliderBgColor.red.toString(16)}${sliderBgColor.green < 16 ? '0' : ''}${sliderBgColor.green.toString(16)}${sliderBgColor.blue < 16 ? '0' : ''}${sliderBgColor.blue.toString(16)}`
            })
        }
    }, [sliderButtonOffset]);

    return (
        <Modal
            show={isClicked}
            onHide={() => setIsClicked(false)}
            centered
        >
            <Modal.Header closeButton>사용자 지정 색깔 선택</Modal.Header>
            <Modal.Body>
                <div
                    style={{position: 'relative', height: '265px'}}
                >
                    <canvas
                        ref={colorPickerRef}
                        style={{position: 'absolute'}}
                    >
                    </canvas>
                    <div
                        className={'colorPickerButton'}
                        style={{
                            left: pickerButtonOffset.offsetX - 12.5,
                            top: pickerButtonOffset.offsetY - 12.5,
                            backgroundColor: pickerBgColor.hex
                        }}
                        onMouseDown={(e) => {
                            isPickerDraggingRef.current = true
                            setMouseOffset({offsetX: e.clientX, offsetY: e.clientY})
                        }}
                        onMouseMove={handlePickerDrag}
                        onMouseUp={handlePickerDrop}
                    ></div>
                    <canvas
                        ref={sliderRef}
                        style={{
                            position: 'absolute',
                            right: 0,
                            borderRadius: 20
                        }}
                    ></canvas>
                    <div
                        className={'sliderButton'}
                        style={{
                            right: 0,
                            top: sliderButtonOffset - 12.5,
                            backgroundColor: sliderBgColor.hex
                        }}
                        onMouseDown={(e) => {
                            isSliderDraggingRef.current = true
                            setMouseOffset({offsetX: e.clientX, offsetY: e.clientY})
                        }}
                        onMouseMove={handleSliderDrag}
                        onMouseUp={handleSliderDrop}
                    ></div>

                </div>
                {
                    pickerBgColor ?
                        <div>
                            {pickerBgColor.red}
                            /
                            {pickerBgColor.green}
                            /
                            {pickerBgColor.blue}
                            <br/>
                            {pickerBgColor.hex}
                        </div>
                        :
                        null
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setIsClicked(false)}>닫기</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ColorModal;
