import { useState, useEffect, useRef } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import api from '../api/api';

export function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('static');
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState({});
  const [modalStart, setModalStart] = useState(false);
  const [error, setError] = useState('');

  const firstStartRef = useRef(null);

  useEffect(() => {
    if (search === '') return;
    const asincApi = async () => {
      try {
        const arr = await api(search, page);

        setData(prev => [...prev, ...arr.hits]);
        setStatus('static');
        setTotalHits(arr.totalHits);
      } catch (error) {
        setStatus('error');
        setError(error);
      }
    };
    setStatus('loading');
    firstStartRef.current = document.body.clientHeight;
    asincApi();
  }, [page, search]);

  const handelSearch = value => {
    setSearch(value, setPage(1), setData([]));
  };
  const handlBtnlick = () => {
    setPage(prevState => prevState + 1);
  };
  const onClickModal = (src, alt) => {
    setModalData({ src, alt });
    setModalStart(true);
  };
  const toggleModal = () => {
    setModalStart(false);
  };
  const totalPage = Math.ceil(totalHits / 12);
  return (
    <div>
      <Searchbar handelSearch={handelSearch} />

      <ImageGallery>
        <ImageGalleryItem data={data} onClickModal={onClickModal} />
      </ImageGallery>
      {status === 'loading' && <Loader />}
      {totalPage > page && <Button handlBtnlick={handlBtnlick} />}
      {status === 'error' && <p style={{ textAlign: 'center' }}>{error.message}</p>}

      {modalStart && <Modal modalData={modalData} toggleModal={toggleModal} />}
    </div>
  );
};

