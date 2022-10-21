import { Icon } from "@iconify/react";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import ImageSvg from "./ImageSvg";

interface Props {
  contentImageState: {
    contentImage: File | null;
    setContentImage: Function;
  };
}

function ImageInputBlock({ contentImageState }: Props) {
  const [isDragging, setIsDragging] = useState(false);

  const [contentImageUrl, setContentImageUrl] = useState<string | null>(null);
  const [contentImageModal, setContentImageModal] = useState(false);

  const { contentImage, setContentImage } = contentImageState;

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setContentImage(e.dataTransfer.files[0]);
    setIsDragging(false);
    readImage(e.dataTransfer.files[0]);
  };

  const readImage = (image: File) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      setContentImageUrl(String(e.target?.result));
    };
    reader.readAsDataURL(image);
  };

  const onImageDeleteClick = () => {
    setContentImage(null);
    setContentImageUrl(null);
  };

  const onContentImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setContentImage(e.target.files[0]);
      readImage(e.target.files[0]);
    }
  };

  const onModalStateChange = ({ state }: { state: boolean }) => {
    setContentImageModal(state);
  };
  return (
    <>
      {contentImage ? (
        <ImageBox>
          <div>
            <Icon
              icon="heroicons:x-circle-20-solid"
              onClick={onImageDeleteClick}
            />
          </div>
          {contentImageUrl && (
            <img
              alt="문제 이미지 미리보기"
              src={contentImageUrl}
              onClick={() => onModalStateChange({ state: true })}
            />
          )}
        </ImageBox>
      ) : (
        <>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            id="input-file"
            style={{ display: "none" }}
            onChange={onContentImageChange}
          />
          <DndBox
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
            isDragging={isDragging}
          >
            <ImageSvg />
            <span>최대 10Mb 이하 jpeg, png 첨부 가능</span>
            <label htmlFor="input-file" role="button">
              이미지 가져오기
            </label>
          </DndBox>
        </>
      )}
      {contentImageModal && (
        <Overlay>
          <Modal>
            <Icon
              icon="bi:x-lg"
              color={"#ffffff"}
              font-size={20}
              onClick={() => onModalStateChange({ state: false })}
            />
            {contentImageUrl && (
              <img alt="문제 이미지 원본 미리보기" src={contentImageUrl} />
            )}
          </Modal>
        </Overlay>
      )}
    </>
  );
}

export default ImageInputBlock;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 12px;

  width: fit-content;
  margin: 0 auto;

  div {
    display: flex;
    justify-content: flex-end;
    width: 100%;

    svg {
      position: relative;

      width: 20px;
      height: 20px;
      top: 10px;
      left: 10px;

      background: #ffffff;
      border-radius: 100%;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);

      cursor: pointer;
    }
  }
  img {
    height: 150px;
    cursor: pointer;
  }
`;

const DndBox = styled.div<{ isDragging: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 24px;

  background: #f9fafb;

  border: ${(p) =>
    p.isDragging ? "2px dashed #A5B4FC" : "2px dashed #e5e7eb"};
  border-radius: 8px;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #9ca3af;

  label {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 24px;
    gap: 6px;

    margin-top: 6px;

    background: ${(p) => (p.isDragging ? "#E5E7EB" : "#111827")};
    border-radius: 8px;

    font-weight: 600;
    font-size: 12px;
    line-height: 16px;

    color: ${(p) => (p.isDragging ? "#9CA3AF" : "#ffffff")};

    cursor: pointer;
  }
`;

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;

  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;

  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);

  z-index: 20;

  svg {
    z-index: 25;
    cursor: pointer;
  }
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: flex-end;

  height: 100%;

  img {
    height: 80%;
  }
`;
