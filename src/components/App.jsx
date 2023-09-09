import { useState } from "react";
import { useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import {GlobalStyle} from "./GlobalStyle.styled"
import { FetchApi } from "./Fetch";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { ButtonMore } from "./Button/Button"; 
import { Modal } from "components/Modal/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const App = () => {
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [isToastShown, setIsToastShown] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const onFetchImages = async () => {
      if (searchValue === "" && !isToastShown) {
        return;
     
      } else {
        if (searchValue.trim() !== "" || page !== 1) {
          setLoading(true);

          try {
            const { hits, totalHits} = await FetchApi(searchValue.split('/').pop(), page);
            setHits((previousHits) => [...previousHits, ...hits]);
            setTotalHits(totalHits);
            
            if (totalHits === 0) {
              toast.error("Nothing has defined, Sorry, there are no images matching your search query. Please try again.", {
                position: toast.POSITION.TOP_CENTER
              });
              return;
            }
            if (!isToastShown) {
              toast.success(`Hooray! We found ${totalHits} images`, {
                position: toast.POSITION.TOP_CENTER
              });
              setIsToastShown(true);
            }
            if (page > Math.round((totalHits / 12))) {
              toast.error(" Ups, We're sorry, but you've reached the end of search results.", {
                position: toast.POSITION.TOP_CENTER
              });
            }

          } catch (error) {
            console.error("Error fetching data from API:", error);
          } finally {
            setLoading(false);
          }
        }
      }
    }

    onFetchImages();
  }, [searchValue, page, isToastShown]);

  const onLoadMore = () => {
    setPage((previousPage) => previousPage + 1);
  };

  const onSearch = (search) => {
    const isValidInput = /^[a-zA-Z0-9\s]+$/.test(search);
    if (!isValidInput || search === "") {
      toast.error("Please enter a valid search query", {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      setHits([]);
      setTotalHits(0);
      setPage(1);
      setSearchValue(search);
      setIsToastShown(false);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = (e) => {
    if (e.target.tagName.toLowerCase() === 'img') {
      return;
    }
    setIsModalOpen(false);
  }

  const appStyles = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridGap: "16px",
    paddingBottom: "24px",
  };

  return (
    <div style={appStyles}>
      <Searchbar onSearch={onSearch} />

      {searchValue !== '' && searchValue.trim() !== '' && (
        <ImageGallery
          images={hits}
          onImageClick={handleImageClick}
          isModalOpen={isModalOpen}
        />
      )}
      {totalHits !== 0 && page < Math.ceil((totalHits / 12)) && (<ButtonMore onLoadMore={onLoadMore} />)}
      <GlobalStyle />
      {isModalOpen && selectedImage && (
        <Modal selectedImage={selectedImage} onClose={handleCloseModal} />
      )}
      {loading && <Loader></Loader>}
      <ToastContainer
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}


