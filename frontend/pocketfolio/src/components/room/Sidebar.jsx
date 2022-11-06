import PortList from './PortList';
import {Container, CloseBox, CloseIcon} from './Sidebar.style';

const Sidebar = ({sidebar, changeSidebar}) => {
  const controlSide = () => {
    if (sidebar === 'port') return changeSidebar('');
  };

  return (
    <Container className={sidebar ? 'open' : null}>
      <CloseBox onClick={controlSide}>
        <CloseIcon />
      </CloseBox>
      {sidebar === 'port' ? <PortList /> : null}
      {sidebar === 'visit' ? null : null}
    </Container>
  );
};

export default Sidebar;
