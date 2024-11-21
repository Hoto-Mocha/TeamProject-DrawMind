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

    const [sliderBgColor, setSliderBgColor] = useState({red: 255, green: 0, blue: 0});

    const [mouseOffset, setMouseOffset] = useState({offsetX: 0, offsetY: 0});

    function makeColorPicker() {
        if (colorPickerRef.current) {
            colorPickerRef.current.width = 256;
            colorPickerRef.current.height = 256;
            const colorPickerContext = colorPickerRef.current.getContext("2d");
            // 상단 그라디언트 (흰색 -> 색상)
            const topGradient = colorPickerContext.createLinearGradient(0, 0, 256, 0);
            topGradient.addColorStop(0, "rgb(255, 255, 255)");
            topGradient.addColorStop(1, `rgb(${sliderBgColor.red}, ${sliderBgColor.green}, ${sliderBgColor.blue})`);

            // 상단 그라디언트를 캔버스에 그리기
            colorPickerContext.fillStyle = topGradient;
            colorPickerContext.fillRect(0, 0, 256, 256);

            // 하단 그라디언트 (투명 -> 검은색)
            const bottomGradient = colorPickerContext.createLinearGradient(0, 0, 0, 256);
            bottomGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
            bottomGradient.addColorStop(1, "rgba(0, 0, 0, 1)");

            // 하단 그라디언트를 캔버스에 그리기
            colorPickerContext.fillStyle = bottomGradient;
            colorPickerContext.fillRect(0, 0, 256, 256);
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
                            backgroundColor: "transparent"
                        }}
                        onMouseDown={(e) => {
                            isPickerDraggingRef.current = true
                            setMouseOffset({offsetX: e.clientX, offsetY: e.clientY})
                        }}
                        onTouchStart={(e) => {
                            isPickerDraggingRef.current = true
                            const touch = e.touches[0];
                            const rect = colorPickerRef.current.getBoundingClientRect();
                            const offsetX = touch.clientX - rect.left;
                            const offsetY = touch.clientY - rect.top;
                            setMouseOffset({offsetX, offsetY})
                        }}
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
                            backgroundColor: `rgb(${sliderBgColor.red}, ${sliderBgColor.green}, ${sliderBgColor.blue})`
                        }}
                        onMouseDown={(e) => {
                            isSliderDraggingRef.current = true
                            setMouseOffset({offsetX: e.clientX, offsetY: e.clientY})
                        }}
                        onTouchStart={(e) => {
                            isSliderDraggingRef.current = true
                            const touch = e.touches[0];
                            const rect = sliderRef.current.getBoundingClientRect();
                            const offsetX = touch.clientX - rect.left;
                            const offsetY = touch.clientY - rect.top;
                            setMouseOffset({offsetX, offsetY})
                        }}
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
