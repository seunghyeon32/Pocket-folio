import RoomNav from './RoomNav';
import RoomInfo from './RoomInfo';
import Sidebar from './Sidebar';
import Menu from './Menu';
import RoomCanvas from '../roomCanvas/RoomCanvas';
import {Container, CanvasWrapper, EditBox, Btn} from './Room.style';
import toast, {Toaster} from 'react-hot-toast';
import {useParams} from 'react-router-dom';
import {useState} from 'react';

// 마이룸
const Room = () => {
  // url로 받아온 room_id
  const params = useParams();
  const room_id = parseInt(params.room_id);

  const [sidebar, setSidebar] = useState('');
  const [edit, setEdit] = useState(false);

  const changeSidebar = state => {
    setSidebar(state);
  };

  const onEdit = () => {
    setEdit(true);
  };

  const offEdit = () => {
    setEdit(false);
    setSidebar('');
  };

  // copy to clipboard
  const copyURL = () => {
    window.navigator.clipboard.writeText(
      `https://k7e101.p.ssafy.io/room/${room_id}`,
    );
    toast.success('URL이 복사되었습니다.');
  };

  return (
    <Container className={sidebar ? 'active' : ''}>
      <RoomNav sidebar={sidebar} edit={edit} />
      <RoomInfo sidebar={sidebar} edit={edit} />
      <CanvasWrapper className={sidebar ? 'active' : ''}>
        <RoomCanvas />
        <Toaster
          position="bottom-left"
          containerStyle={{
            position: 'absolute',
          }}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333333',
              fontSize: '0.85rem',
            },
          }}
        />
        {edit ? (
          <EditBox>
            <Btn>저장</Btn>
            <Btn onClick={offEdit}>취소</Btn>
          </EditBox>
        ) : null}
      </CanvasWrapper>

      {sidebar | edit ? null : (
        <Menu
          room_id={room_id}
          changeSidebar={changeSidebar}
          copyURL={copyURL}
          onEdit={onEdit}
        />
      )}

      <Sidebar sidebar={sidebar} changeSidebar={changeSidebar} edit={edit} />
    </Container>
  );
};

export default Room;
