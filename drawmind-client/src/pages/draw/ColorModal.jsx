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

    const sliderBgColorRef = useRef({red: 255, green: 0, blue: 0})

    // 컬러피커 생성 코드
    function makeColorPicker() {
        if (colorPickerRef.current) {
            colorPickerRef.current.width = 256;
            colorPickerRef.current.height = 256;
            const colorPickerContext = colorPickerRef.current.getContext("2d");

            // 상단 그라디언트 (흰색 -> 색상)
            const topGradient = colorPickerContext.createLinearGradient(0, 0, 256, 0);
            topGradient.addColorStop(0, "rgb(255, 255, 255)");
            topGradient.addColorStop(1, `rgb(${sliderBgColorRef.current.red}, ${sliderBgColorRef.current.green}, ${sliderBgColorRef.current.blue})`);

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

    // 슬라이더 생성 코드
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

    // 모달 화면 생성 코드
    useEffect(() => {
        if (isClicked) {
            makeColorPicker()
            makeSlider()
        }
    }, [isClicked]);

    // 드래그, 터치 이벤트 등록 코드
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

    // 컬러피커 버튼 드래그 대응 코드
    function handlePickerDrag(e) {
        const canvas = colorPickerRef.current;
        if (!canvas || !isPickerDraggingRef.current) return;

        const rect = canvas.getBoundingClientRect();

        const {clientX, clientY} = e.touches ? e.touches[0] : e

        const offsetX = Math.max(0, Math.min(255, clientX - rect.left));
        const offsetY = Math.max(0, Math.min(255, clientY - rect.top));

        pickerButtonOffsetRef.current = {x: offsetX, y: offsetY};
        setPickerButtonColor()
    }

    // 컬러피커 버튼 드랍 대응 코드
    function handlePickerDrop() {
        isPickerDraggingRef.current = false
    }

    // pickerBgColor 업데이트하는 코드
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

    function setSliderButtonColor() {
        if (sliderRef.current) {
            const ctx = sliderRef.current.getContext("2d");
            const pixel = ctx.getImageData(0, sliderButtonOffsetRef.current, 1, 1).data;

            sliderBgColorRef.current = {
                red: pixel[0],
                green: pixel[1],
                blue: pixel[2],
            }
        }
    }

    // 슬라이더 드래그 대응 코드
    function handleSliderDrag(e) {
        const canvas = sliderRef.current;
        if (!canvas || !isSliderDraggingRef.current) return;

        const rect = canvas.getBoundingClientRect();
        const {clientY} = e.touches ? e.touches[0] : e
        sliderButtonOffsetRef.current = Math.max(0, Math.min(255, clientY - rect.top))

        setSliderButtonColor()
        makeColorPicker()
        setPickerButtonColor()
    }

    // 슬라이더 드랍 대응 코드
    function handleSliderDrop() {
        isSliderDraggingRef.current = false
    }

    function typeColor(e, type) {
        const input = e.target.value;

        setPickerBgColor((prev) => {
            let updatedColor;
            if (type === 'hex') {
                const hex = input.replace("#", "");
                if (hex.length === 6) {
                    updatedColor = {
                        red: parseInt(hex.slice(0, 2), 16),
                        green: parseInt(hex.slice(2, 4), 16),
                        blue: parseInt(hex.slice(4, 6), 16),
                        hex: `#${hex}`
                    };
                } else {
                    updatedColor = { ...prev, hex: input };
                }
            } else {
                updatedColor = {
                    ...prev,
                    [type]: input === "" ? input : parseInt(input),
                    hex: `#${[
                        type === "red" ? input.padStart(2, "0") : prev.red.toString(16).padStart(2, "0"),
                        type === "green" ? input.padStart(2, "0") : prev.green.toString(16).padStart(2, "0"),
                        type === "blue" ? input.padStart(2, "0") : prev.blue.toString(16).padStart(2, "0"),
                    ].join("")}`
                };
            }

            // RGB를 기준으로 버튼 좌표를 즉시 계산
            const { sliderY, pickerX, pickerY } = calculatePositionsFromRgb(
                updatedColor.red,
                updatedColor.green,
                updatedColor.blue
            );
            sliderButtonOffsetRef.current = sliderY;
            pickerButtonOffsetRef.current = { x: pickerX, y: pickerY };

            setSliderButtonColor(); // 슬라이더 색상도 즉시 업데이트
            makeColorPicker();      // 컬러피커 다시 그리기

            return updatedColor;
        });
    }


// RGB 값을 기준으로 슬라이더 및 컬러피커 좌표 계산
    function calculatePositionsFromRgb(red, green, blue) {
        console.log(red, green, blue)
        // RGB -> HSV 변환
        const r = red / 255;
        const g = green / 255;
        const b = blue / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;

        let hue = 0;
        let saturation = 0;
        const value = max;

        // Hue 계산
        if (delta !== 0) {
            if (max === r) hue = ((g - b) / delta) % 6;
            else if (max === g) hue = (b - r) / delta + 2;
            else if (max === b) hue = (r - g) / delta + 4;

            hue = Math.round(hue * 60);
            if (hue < 0) hue += 360;
        }

        // Saturation 계산
        if (max !== 0) {
            saturation = delta / max;
        }

        // 좌표 계산
        const sliderY = Math.round((hue / 360) * 256); // 슬라이더 높이에 맞게 변환
        const pickerX = Math.round(saturation * 256); // 컬러피커 X 좌표
        const pickerY = Math.round((1 - value) * 256); // 컬러피커 Y 좌표

        console.log(sliderY, pickerX, pickerY)

        return { sliderY, pickerX, pickerY };
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
                            backgroundColor: `rgb(${sliderBgColorRef.current.red}, ${sliderBgColorRef.current.green}, ${sliderBgColorRef.current.blue})`
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
                            <input type="text"
                                   value={pickerBgColor.red}
                                   onChange={e => typeColor(e, 'red')}
                            />
                            <input type="text"
                                   value={pickerBgColor.green}
                                   onChange={e => typeColor(e, 'green')}
                            />
                            <input type="text"
                                   value={pickerBgColor.blue}
                                   onChange={e => typeColor(e, 'blue')}
                            />
                            <input type="text"
                                   value={pickerBgColor.hex}
                                   onChange={e => typeColor(e, 'hex')}
                            />
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
