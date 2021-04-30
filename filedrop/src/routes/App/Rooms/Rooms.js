import { h } from 'preact';
import { route } from 'preact-router';
import { useState, useContext, useEffect } from 'preact/hooks';
import { Loader, Plus, X } from 'preact-feather';

import { QueuedFiles } from '../QueuedFiles';
import Fab from '../../../components/Fab/Fab';
import Modal from '../../../components/Modal/Modal';
import pluralize from '../../../utils/pluralize';
import useInstantRoom from '../../../hooks/useInstantRoom';

import './Rooms.scss';

function NewRoomModal({ onNewRoom, ...props }) {
  const [room, setRoom] = useState();
  const [getInstantRoom, { loading: isLoading }] = useInstantRoom((room) => {
    onNewRoom(room);
  });

  const handleSubmit = e => {
    e.preventDefault();
    onNewRoom(room);
  };

  const handleRoomInputChange = e => {
    e.target.setCustomValidity('');
    setRoom(e.target.value);
  };

  return (
    <Modal {...props}>
      <div class="join-room">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxlength="20"
            required
            placeholder="Block name"
            pattern="^([A-Za-z0-9]+ ?)+[A-Za-z0-9]$"
            style="margin-top: 0"
            value={room}
            onInvalid={e => { e.target.setCustomValidity('Room names can contain only letters and numbers'); }}
            onChange={handleRoomInputChange}
            disabled={isLoading}
          />
          <button type="submit" class="wide" disabled={isLoading}>
            Join Block
          </button>
        </form>
        <hr />
        <button class="outlined wide" onClick={getInstantRoom} disabled={isLoading}>
          <Loader size={18} />
          &nbsp;&nbsp;
          { isLoading ? 'Joining' : 'Join an Instant Block' }
        </button>
        <p class="instant-room-help">
          Tip: Instant Blocks are created just for you!
        </p>
      </div>
    </Modal>
  );
}


function Rooms({ isOnline }) {
  const [isModalOpen, setModal] = useState(false);
  let data = JSON.parse(localStorage.getItem('filedrop'));
  const [rooms, setRooms] = useState(data.rooms);
  const { queuedFiles } = useContext(QueuedFiles);

  const handleNewRoom = (room) => {
    setModal(false);
    const roomURL = room.replace(/ /g, '-').toLowerCase();
    route(`/app/${roomURL}`);
  };

  const removeRoom = (room) => {
    const newRooms = rooms.filter(roomName => roomName !== room);
    setRooms(newRooms);

    data = {
      ...data,
      rooms: newRooms,
    };

    localStorage.setItem('filedrop', JSON.stringify(data));
  };

  useEffect(() => {
    document.title = 'App | FileDrop';
    
    if (rooms.length === 0) {
      setModal(true);
    }
  }, [setModal]);

  return (
    <div class="rooms">
      <header class="app-header">
        <h1 class="title">Recent Blocks</h1>
      </header>

      <main>
        {
          isOnline ? (
            <>
              {
                rooms.length ? (
                  <>
                    {
                      !!queuedFiles.length && (
                        <div class="message" style="margin-top: 0; margin-bottom: 2.5rem;">
                          Join a block to share the selected
                          {' '}
                          {pluralize(queuedFiles.length, 'file', 'files')}
                        </div>
                      )
                    }
                    <ul class="recent-rooms">
                      {
                        rooms.map(room => (
                          <li role="link" tabIndex="0" onClick={() => handleNewRoom(room)}>
                            <div>{room}</div>
                            <button
                              class="thin icon remove-room"
                              aria-label="Remove block"
                              onClick={e => {
                                e.stopPropagation();
                                removeRoom(room);
                              }}
                            >
                              <X />
                            </button>
                          </li>
                        ))
                      }
                    </ul>
                    <div class="donate">
                      Like using FileDrop? Please consider
                      <a href="https://www.buymeacoffee.com/chaitanyap"> donating</a>
                    </div>
                  </>
                ) : (
                  <>
                    <div class="message">
                      {
                        queuedFiles.length ?
                          `Create a block using + button to share the selected ${pluralize(queuedFiles.length, 'file', 'files')}` :
                          'Start by joining a block using the + button'
                      }
                      <p class="devices-same-room">
                        Devices must join same block to share files with each other
                      </p><br/>
                      <a class="btn" href="/">Go back home</a>
                    </div>
                  </>
                )
              }
              <Fab text="New Block" onClick={() => setModal(true)}>
                <Plus />
              </Fab>
            </>
          ) : <div class="message">Connect to the internet to start sharing files</div>
        }
      </main>

      <NewRoomModal isOpen={isModalOpen} onNewRoom={handleNewRoom} onClose={() => setModal(false)} />
    </div>
  );
}

export default Rooms;