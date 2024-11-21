import '../../css/ColorModal.css'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useEffect, useRef, useState} from "react";


function ColorModal({setConfig, pickerBgColor, setPickerBgColor, isClicked, setIsClicked}) {

    const colorPickerRef = useRef(null);
    const sliderRef = useRef(null)

    const isPickerDraggingRef = useRef(false)
    const isSliderDraggingRef = useRef(false)

    const pickerButtonOffsetRef = useRef({x: 0, y: 0})
    const sliderButtonOffsetRef = useRef(0)

    const sliderColorRef = useRef({red: 255, green: 0, blue: 0})

    function makeColorPicker() {
        if (colorPickerRef.current) {
            colorPickerRef.current.width = 256;
            colorPickerRef.current.height = 256;
            const colorPickerContext = colorPickerRef.current.getContext("2d");

            // 상단 그라디언트 (흰색 -> 색상)
            const topGradient = colorPickerContext.createLinearGradient(0, 0, 256, 0);
            topGradient.addColorStop(0, "rgb(255, 255, 255)");
            topGradient.addColorStop(1, `rgb(${sliderColorRef.current.red}, ${sliderColorRef.current.green}, ${sliderColorRef.current.blue})`);

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

            setPickerButtonColor()
        }
    }

    function makeSlider() {
        if (sliderRef.current) {
            sliderRef.current.width = 25
            sliderRef.current.height = 256
            const context = sliderRef.current.getContext("2d");

            const topGradient = context.createLinearGradient(0, 0, 0, 256)

            topGradient.addColorStop(0, '#F00');
            topGradient.addColorStop(1 / 6, '#FF0');
            topGradient.addColorStop(2 / 6, '#0F0');
            topGradient.addColorStop(3 / 6, '#0FF');
            topGradient.addColorStop(4 / 6, '#00F');
            topGradient.addColorStop(5 / 6, '#F0F');
            topGradient.addColorStop(1, '#F00');

            context.fillStyle = topGradient;
            context.fillRect(0, 0, 25, 256);
        }
    }

    useEffect(() => {
        if (isClicked) {
            makeColorPicker()
            makeSlider()
        }
    }, [isClicked]);

    useEffect(() => {
        if (isPickerDraggingRef.current) {
            document.addEventListener('mousemove', handlePickerDrag);
            document.addEventListener('mouseup', handlePickerDrop);
            document.addEventListener('touchmove', handlePickerDrag);
            document.addEventListener('touchend', handlePickerDrop)
        } else {
            document.removeEventListener('mousemove', handlePickerDrag);
            document.removeEventListener('mouseup', handlePickerDrop);
            document.removeEventListener('touchmove', handlePickerDrag);
            document.removeEventListener('touchend', handlePickerDrop)
        }

        return () => {
            document.removeEventListener('mousemove', handlePickerDrag);
            document.removeEventListener('mouseup', handlePickerDrop);
            document.removeEventListener('touchmove', handlePickerDrag);
            document.removeEventListener('touchend', handlePickerDrop)
        }
    }, [isPickerDraggingRef.current]);

    useEffect(() => {
        if (isSliderDraggingRef.current) {
            document.addEventListener('mousemove', handleSliderDrag);
            document.addEventListener('mouseup', handleSliderDrop);
            document.addEventListener('touchmove', handleSliderDrag);
            document.addEventListener('touchend', handleSliderDrop)
        } else {
            document.removeEventListener('mousemove', handleSliderDrag);
            document.removeEventListener('mouseup', handleSliderDrop);
            document.removeEventListener('touchmove', handleSliderDrag);
            document.removeEventListener('touchend', handleSliderDrop)
        }

        return () => {
            document.removeEventListener('mousemove', handleSliderDrag);
            document.removeEventListener('mouseup', handleSliderDrop);
            document.removeEventListener('touchmove', handleSliderDrag);
            document.removeEventListener('touchend', handleSliderDrop)
        }
    }, [isSliderDraggingRef.current]);

    function handlePickerDrag(e) {
        const canvas = colorPickerRef.current;
        if (!canvas || !isPickerDraggingRef.current) return;

        const rect = canvas.getBoundingClientRect();

        const {clientX, clientY} = e.touches ? e.touches[0] : e

        const offsetX = Math.max(0, Math.min(255, clientX - rect.left));
        const offsetY = Math.max(0, Math.min(255, clientY - rect.top));

        pickerButtonOffsetRef.current = { x: offsetX, y: offsetY };
        setPickerButtonColor()
    }

    function handlePickerDrop() {
        isPickerDraggingRef.current = false
    }

    function setPickerButtonColor() {
        if (colorPickerRef.current) {
            const context = colorPickerRef.current.getContext('2d')
            const pixel = context.getImageData(pickerButtonOffsetRef.current.x, pickerButtonOffsetRef.current.y, 1, 1).data
            const hex = `#${pixel[0].toString(16).padStart(2, "0")}${pixel[1].toString(16).padStart(2, "0")}${pixel[2].toString(16).padStart(2, "0")}`;
            setPickerBgColor({
                red: pixel[0],
                green: pixel[1],
                blue: pixel[2],
                hex: hex
            })
            setConfig(prev => ({...prev, strokeStyle: hex}))
        }
    }

    function handleSliderDrag(e) {
        const canvas = sliderRef.current;
        if (!canvas || !isSliderDraggingRef.current) return;

        const rect = canvas.getBoundingClientRect();
        const {clientY} = e.touches ? e.touches[0] : e
        const offsetY = Math.max(0, Math.min(255, clientY - rect.top));

        sliderButtonOffsetRef.current = offsetY

        const ctx = canvas.getContext("2d");
        const pixel = ctx.getImageData(0, offsetY, 1, 1).data;

        sliderColorRef.current = {
            red: pixel[0],
            green: pixel[1],
            blue: pixel[2],
        };

        makeColorPicker()
    }

    function handleSliderDrop() {
        isSliderDraggingRef.current = false
    }

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
                        onMouseDown={(e) => {
                            isPickerDraggingRef.current = true
                            handlePickerDrag(e)
                        }}
                        onMouseMove={handlePickerDrag}
                        onMouseUp={handlePickerDrop}
                        onTouchStart={e => {
                            isPickerDraggingRef.current = true
                            handlePickerDrag(e)
                        }}
                        onTouchMove={handlePickerDrag}
                        onTouchEnd={handlePickerDrop}
                    >
                    </canvas>
                    <div
                        className={'colorPickerButton'}
                        style={{
                            left: pickerButtonOffsetRef.current.x - 12.5,
                            top: pickerButtonOffsetRef.current.y - 12.5,
                            backgroundColor: "transparent"
                        }}
                        onMouseDown={(e) => {
                            isPickerDraggingRef.current = true
                            handlePickerDrag(e)
                        }}
                        onMouseMove={handlePickerDrag}
                        onMouseUp={handlePickerDrop}
                        onTouchStart={e => {
                            isPickerDraggingRef.current = true
                            handlePickerDrag(e)
                        }}
                        onTouchMove={handlePickerDrag}
                        onTouchEnd={handlePickerDrop}
                    ></div>
                    <canvas
                        ref={sliderRef}
                        style={{
                            position: 'absolute',
                            right: 0,
                            borderRadius: 20
                        }}
                        onMouseDown={e => {
                            isSliderDraggingRef.current = true
                            handleSliderDrag(e)
                        }}
                        onMouseMove={handleSliderDrag}
                        onMouseUp={handleSliderDrop}
                        onTouchStart={e => {
                            isSliderDraggingRef.current = true
                            handleSliderDrag(e)
                        }}
                        onTouchMove={handleSliderDrag}
                        onTouchEnd={handleSliderDrop}
                    ></canvas>
                    <div
                        className={'sliderButton'}
                        style={{
                            right: 0,
                            top: sliderButtonOffsetRef.current - 12.5,
                            backgroundColor: `rgb(${sliderColorRef.current.red}, ${sliderColorRef.current.green}, ${sliderColorRef.current.blue})`
                        }}
                        onMouseDown={(e) => {
                            isSliderDraggingRef.current = true
                            handleSliderDrag(e)
                        }}
                        onMouseMove={handleSliderDrag}
                        onMouseUp={handleSliderDrop}
                        onTouchStart={e => {
                            isSliderDraggingRef.current = true
                            handleSliderDrag(e)
                        }}
                        onTouchMove={handleSliderDrag}
                        onTouchEnd={handleSliderDrop}
                    ></div>

                </div>
                {
                    pickerBgColor ?
                        <div>
                            red : {pickerBgColor.red}
                            /
                            green : {pickerBgColor.green}
                            /
                            blue : {pickerBgColor.blue}
                            <br/>
                            hex: {pickerBgColor.hex}
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
