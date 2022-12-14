// AddPort
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {
  Wrapper,
  Background,
  Label,
  ContentDiv,
  Title,
  BottomBox,
  AttachWrap,
  InputDiv,
  HashInput,
  FeedbackText,
  HashOutter,
  HashList,
  BtnDiv,
  StyledBtn,
  IconDiv,
  ItemList,
  Item,
  FileName,
  Cancel,
  Add,
} from './AddPort.style';
import Nav from '../common/Nav';
import Editor from './Editor';
import {Body1} from '../../styles/styles.style';
import SaveModal from './SaveModal';
import {registPortfolio} from '../../store/portSlice';

const AddPort = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 저장 모달 오픈 변수
  const [modalOpen, setModalOpen] = useState(false);
  // 첨부 파일 리스트
  const [attachList, setAttachList] = useState([]);
  // 포트폴리오 제목, 내용 변수
  const [portContent, setPortContent] = useState({
    name: '',
    summary: '',
  });
  // 해시태그 인풋값
  const [hashtag, setHashtag] = useState('');
  // 등록 된 해시태그
  const [hashArr, setHashArr] = useState([]);
  // 썸네일 변수
  const [thumbNail, setThumbNail] = useState('');
  // 업로드 기록 (seq, url)
  const [uploadHistory, setUploadHisory] = useState([]);
  // 업로드 한 이미지 (post)
  const [uploadImg, setUploadImg] = useState([]);
  // 최종 등록할 이미지 (post)
  const [resultImg, setResultImg] = useState([]);

  // 제목 길이 유효성 검사
  const [minTitleLeng, setMinTitleLeng] = useState(false);

  // 파일명 길이 유효성 검사
  const [overFileName, setOverFileName] = useState(false);

  // 해시태그 유효성(공백, 특수문자) 검사
  const [correctHash, setCorrectHash] = useState(false);

  // 포트폴리오 제목 저장
  const getValue = e => {
    const {name, value} = e.target;

    if (value.length === 0) {
      setMinTitleLeng(true);
    } else {
      setPortContent({
        ...portContent,
        [name]: value,
      });
      setMinTitleLeng(false);
    }
  };
  // 해시태그 입력
  const onChangeHashtag = e => {
    const hashInput = e.target.value;
    // 특수문자, 공백 정규식
    const special = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    const space = /\s/g;
    if (special.test(hashInput) || space.test(hashInput)) {
      setCorrectHash(true);
    } else {
      setCorrectHash(false);
    }
    setHashtag(e.target.value);
  };

  // 해시태그 입력창에서 엔터 눌렀을 때,
  const onKeyUp = e => {
    const hashInput = e.target.value;
    // 해시태그 배열에 추가 후 입력 창 초기화
    // 빈문자, 공백, 특수문자 입력 불가
    if (e.keyCode === 13 && hashInput.trim() !== '') {
      // 특수문자, 공백 정규식
      const special = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      const space = /\s/g;

      if (special.test(hashInput) || space.test(hashInput)) {
        setCorrectHash(true);
      } else {
        setHashArr(hashArr => [...hashArr, hashtag]);
        setCorrectHash(false);
        setHashtag('');
      }
    }
  };

  // 해시태그 삭제
  const deleteHash = e => {
    let selected = e.target.getAttribute('value');
    const result = hashArr.filter(content => content !== selected);
    setHashArr(result);
  };

  // 취소 버튼 클릭 시 /port 로 이동
  const clickCancel = () => {
    navigate('/port');
  };

  // 모달 관련 변수,함수
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // 파일 첨부 (버튼 스타일링을 위한 UseRef)
  const fileInput = React.useRef(null);
  const handleButtonClick = e => {
    fileInput.current.click();
  };
  const handleChange = e => {
    if (e.target.files[0].name.length > 50) {
      setOverFileName(true);
    } else if (e.target.files[0] !== undefined) {
      setAttachList(attachList => [...attachList, e.target.files[0]]);
    }
  };

  // 파일 첨부 취소
  const cancelAttach = e => {
    let selected = e.target.getAttribute('value');
    const result = attachList.filter(content => content.name !== selected);
    setAttachList(result);
  };

  // 썸네일 첨부
  const thumbNailInput = React.useRef(null);
  const thumbButtonClick = e => {
    thumbNailInput.current.click();
  };
  const uploadThumbnail = e => {
    const file = e.target.files[0];
    setThumbNail(file);
  };

  // 썸네일 첨부 취소
  const cancelThumb = () => {
    setThumbNail('');
  };

  // Editor에서 이미지 추가 시 실행
  const addImgHandle = (seq, url) => {
    setUploadHisory(uploadHistory => [
      ...uploadHistory,
      {
        id: seq,
        imgurl: url,
      },
    ]);
    setUploadImg(uploadImg => [...uploadImg, seq]);
  };

  // 최종적으로 제출할 imgSeq 찾기
  const compareImgList = () => {
    // 포폴 내용
    const content = portContent.summary;
    // src 내용 추출 정규식
    const imgSrcReg = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;

    while (imgSrcReg.test(content)) {
      // summary 안의 src 값들을 하나씩 추출
      let src = RegExp.$2.trim();

      uploadHistory.forEach(function (val, idx) {
        if (src === val.imgurl) {
          setResultImg(resultImg => [...resultImg, val.id]);
          const newHistory = uploadHistory.splice(idx);
          setUploadHisory(newHistory);
          return false;
        }
      });
    }
  };

  // 포트폴리오 제출
  const savePortFolio = () => {
    if (portContent.name.length === 0) {
      setMinTitleLeng(true);
      closeModal();
    } else {
      const form = new FormData();
      const port = JSON.stringify({
        name: portContent.name,
        summary: portContent.summary,
        tags: hashArr,
      });

      const uploadImage = JSON.stringify(uploadImg);

      const resultImage = JSON.stringify(resultImg);

      form.append(
        'uploadImg',
        new Blob([uploadImage], {type: 'application/json'}),
      );
      form.append('portfolio', new Blob([port], {type: 'application/json'}));
      form.append(
        'resultImg',
        new Blob([resultImage], {type: 'application/json'}),
      );

      let files = attachList;
      for (let i = 0; i < files.length; i++) {
        form.append('files', files[i]);
      }
      form.append('thumbnail', thumbNail);
      compareImgList();

      dispatch(registPortfolio(form))
        .unwrap()
        .then(res => {
          closeModal();
          navigate(`/port`);
        });
    }
  };

  return (
    <Background>
      <Nav></Nav>
      <Wrapper className="wrapper">
        <ContentDiv>
          <Title
            type="text"
            maxLength={50}
            autoComplete="off"
            placeholder="포트폴리오 제목 (50자 이하)"
            onChange={getValue}
            name="name"
            style={{
              padding: '1.5em 1em',
            }}
            autoFocus
          ></Title>
          {minTitleLeng && (
            <FeedbackText>제목을 1~50자 사이로 입력해주세요.</FeedbackText>
          )}
        </ContentDiv>

        <ContentDiv>
          <Editor
            portContent={portContent}
            setPortContent={setPortContent}
            addImgHandle={addImgHandle}
          />
        </ContentDiv>

        <ContentDiv className="bottom">
          <BottomBox className="hashWrap">
            <Label>해시태그</Label>
            <InputDiv>
              <HashInput
                className="HashInput"
                name="hashtag"
                value={hashtag}
                onChange={onChangeHashtag}
                onKeyUp={onKeyUp}
                maxLength={12}
                placeholder="해시태그 (12자 이하)"
              />
            </InputDiv>
            {correctHash && (
              <FeedbackText>공백, 특수문자 입력 불가</FeedbackText>
            )}
            <HashList>
              {hashArr.map((item, idx) => (
                <HashOutter key={idx} value={item} onClick={deleteHash}>
                  # {item}
                </HashOutter>
              ))}
            </HashList>
          </BottomBox>

          <BottomBox className="attachWrap">
            <AttachWrap>
              <Label className="attachLabel">파일첨부</Label>
              <IconDiv>
                <Add
                  onClick={() => {
                    handleButtonClick();
                    setOverFileName(false);
                  }}
                ></Add>
              </IconDiv>
            </AttachWrap>
            {overFileName && (
              <FeedbackText>파일명은 50자를 넘을 수 없습니다. </FeedbackText>
            )}
            <input
              type="file"
              ref={fileInput}
              onChange={handleChange}
              multiple="multiple"
              style={{display: 'none'}}
            />
            <ItemList>
              {attachList.map((item, idx) => (
                <Item key={idx}>
                  <FileName className="name">{item.name}</FileName>
                  <IconDiv>
                    <Cancel onClick={e => cancelAttach(e)} value={item.name} />
                  </IconDiv>
                </Item>
              ))}
            </ItemList>
          </BottomBox>

          <BottomBox>
            <AttachWrap>
              <Label>썸네일</Label>
              <IconDiv>
                <Add onClick={thumbButtonClick}></Add>
              </IconDiv>
            </AttachWrap>
            <input
              type="file"
              ref={thumbNailInput}
              accept="image/*"
              onChange={uploadThumbnail}
              style={{display: 'none'}}
            />
            {thumbNail.length !== 0 ? (
              <Item>
                {thumbNail.name}
                <IconDiv>
                  <Cancel onClick={cancelThumb} />
                </IconDiv>
              </Item>
            ) : null}
          </BottomBox>
        </ContentDiv>
      </Wrapper>

      <BtnDiv>
        <StyledBtn className="cancel" onClick={clickCancel}>
          <Body1>취소</Body1>
        </StyledBtn>
        <StyledBtn className="save" onClick={openModal}>
          <Body1>저장</Body1>
        </StyledBtn>
      </BtnDiv>

      <SaveModal
        open={modalOpen}
        close={closeModal}
        save={savePortFolio}
      ></SaveModal>
    </Background>
  );
};

export default AddPort;
