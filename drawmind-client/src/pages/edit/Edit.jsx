import 'ckeditor5/ckeditor5.css';
import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import toast, {toastConfig} from 'react-simple-toasts';
import "../../css/Edit.css"
import 'ckeditor5/ckeditor5.css';
import {
    ClassicEditor,
    AccessibilityHelp,
    Autoformat,
    AutoImage,
    Autosave,
    BlockQuote,
    Bold,
    CloudServices,
    Essentials,
    Heading,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    SelectAll,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    TodoList,
    Underline,
    Undo
} from 'ckeditor5';

import translations from 'ckeditor5/translations/ko.js';
import API from '../../API';
import MyCanvas from "../draw/MyCanvas.jsx";
import ConfirmModal from "../../components/common/ConfirmModal.jsx";

toastConfig({
    theme: 'dark',
});

function Edit() {

    const navigate = useNavigate();

    const location = useLocation();

    const [show, setShow] = useState(false);

    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);

    const [titleData, setTitleData] = useState('')
    const [editorData, setEditorData] = useState('');
    const [postSeq, setPostSeq] = useState('');
    const [imgURL, setImgURL] = useState(null)
    const [editorSize, setEditorSize] = useState()

    useEffect(() => {
        setIsLayoutReady(true);
        const postData = location.state;

        setTitleData(postData.title)
        setEditorData(postData.content)
        setPostSeq(postData.postSeq)
        setImgURL(postData.imgURL)
        setEditorSize(postData.editorSize)

        return () => setIsLayoutReady(false);
    }, [location.state])

    const editorConfig = {
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                '|',
                'link',
                'mediaEmbed',
                'insertTable',
                'blockQuote',
                '|',
                'bulletedList',
                'numberedList',
                'todoList',
                'outdent',
                'indent'
            ],
            shouldNotGroupWhenFull: false
        },
        plugins: [
            AccessibilityHelp,
            Autoformat,
            AutoImage,
            Autosave,
            BlockQuote,
            Bold,
            CloudServices,
            Essentials,
            Heading,
            ImageBlock,
            ImageCaption,
            ImageInline,
            ImageInsertViaUrl,
            ImageResize,
            ImageStyle,
            ImageTextAlternative,
            ImageToolbar,
            ImageUpload,
            Indent,
            IndentBlock,
            Italic,
            Link,
            LinkImage,
            List,
            ListProperties,
            MediaEmbed,
            Paragraph,
            PasteFromOffice,
            SelectAll,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TextTransformation,
            TodoList,
            Underline,
            Undo
        ],
        heading: {
            options: [
                {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                },
                {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
                },
                {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
                },
                {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
                },
                {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
                },
                {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5'
                },
                {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6'
                }
            ]
        },
        image: {
            toolbar: [
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'imageStyle:inline',
                'imageStyle:wrapText',
                'imageStyle:breakText',
                '|',
                'resizeImage'
            ]
        },
        initialData:
            '',
        language: 'ko',
        link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            decorators: {
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
        },
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true
            }
        },
        placeholder: 'Type or paste your content here!',
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        mediaEmbed: {
            previewsInData: true
        },
        translations: [translations]
    };

    // CKEditor에서 데이터가 변경될 때마다 상태를 업데이트
    const handleEditorChange = (event, editor) => {
        setEditorData(editor.getData());
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const previousBtnHandler = () => {
        handleShow()
    }

    const nextBtnHandler = () => {
        setIsDrawing(!isDrawing)
    }

    const postRef = useRef(null);  // 포스트를 참조하는 useRef

    return (
        <div className='content'>
            {
                !isDrawing && <div className='textEditArea'>
                    <div className='editorHeader'>
                        <Form.Control
                            value={titleData}
                            onChange={(e) => setTitleData(e.target.value)}
                            className='titleInput'
                            placeholder='제목'
                        />
                        <button className='btn btn-primary btn-sm nextBtn' onClick={nextBtnHandler}>다음</button>
                    </div>
                    <div className="main-container">
                        <div className="editor-container editor-container_classic-editor">
                            <div className="editor-container__editor">
                                <div>{isLayoutReady &&
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={editorConfig}
                                        onReady={(editor) => {
                                            editor.setData(editorData)
                                        }}
                                        onChange={handleEditorChange}
                                    />}</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {isDrawing && <MyCanvas
                postRef={postRef}
                titleData={titleData}
                editorData={editorData}
                previousBtnHandler={previousBtnHandler}
                editorSize={editorSize}
                imgURL={imgURL}
                isEditing={true}
                postSeq={postSeq}
            />}
            <ConfirmModal
                show={show}
                handleClose={handleClose}
                title="정말로 돌아가시겠습니까?"
                message="이전 화면으로 돌아가면 그린 그림은 모두 사라집니다."
                noBtnMsg="취소"
                yesBtnMsg="확인"
                yesBtnHandler={nextBtnHandler}
            />
        </div>
    )
}

export default Edit
