import React, { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BeatImage from "./BeatImage"; // Импортируем компонент BeatImage

{
  /*
  import MyComponent from "./components/MyComponent.jsx";
  import { DndProvider } from "react-dnd";
  import { HTML5Backend } from "react-dnd-html5-backend";
   <DndProvider backend={HTML5Backend}>
            <div>
              <MyComponent
                onPatternChanged={(beatPattern) => {
                  setSearchParams({ p: beatPattern });
                }}
              />
            </div>
          </DndProvider> */
}
const ItemTypes = {
  BLOCK: "block",
};

const MyComponent = ({ onPatternChanged }) => {
  const [blocks, setBlocks] = React.useState([
    { id: 1, bits: "1000", letter: "A" },
    { id: 2, bits: "0100", letter: "B" },
    { id: 3, bits: "0010", letter: "C" },
    { id: 4, bits: "0001", letter: "D" },
    { id: 5, bits: "1100", letter: "E" },
    { id: 6, bits: "0110", letter: "F" },
    { id: 7, bits: "0011", letter: "G" },
    { id: 8, bits: "1001", letter: "H" },
    { id: 9, bits: "1010", letter: "I" },
    { id: 10, bits: "0101", letter: "J" },
    { id: 11, bits: "1110", letter: "K" },
    { id: 12, bits: "0111", letter: "L" },
    { id: 13, bits: "1011", letter: "M" },
    { id: 14, bits: "1101", letter: "N" },
    { id: 15, bits: "1111", letter: "O" },
    { id: 16, bits: "0000", letter: "P" },
  ]);

  const [selectedBits, setSelectedBits] = React.useState("");

  useEffect(() => {
    // При монтировании компонента, устанавливаем начальное значение selectedBits
    const initialSelectedBits = blocks.map((block) => block.bits).join("");
    setSelectedBits(initialSelectedBits);
  }, [blocks]);

  const moveBlock = (dragIndex, hoverIndex) => {
    const dragBlock = blocks[dragIndex];
    setBlocks((prevBlocks) => {
      const newBlocks = [...prevBlocks];
      newBlocks.splice(dragIndex, 1);
      newBlocks.splice(hoverIndex, 0, dragBlock);
      return newBlocks;
    });

    // Обновляем комбинацию битов после перемещения блока
    const newSelectedBits = blocks.map((block) => block.bits).join("");
    setSelectedBits(newSelectedBits);
  };

  const Block = ({ id, bits, letter, index }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.BLOCK,
      item: { id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: ItemTypes.BLOCK,
      hover(item, monitor) {
        if (!item || !index) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        moveBlock(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
      <div ref={(node) => drag(drop(node))} style={{ ...itemStyle, opacity }}>
        <div>{letter}</div>
        {/* Вставляем компонент BeatImage для отображения комбинации бит */}
        <BeatImage beatString={bits} />
      </div>
    );
  };

  const handleSendBits = (bits) => {
    // Проверяем, что selectedBits не равно null, перед отправкой
    if (bits !== null) {
      onPatternChanged(bits);
      console.log("Selected bits:", bits);
    } else {
      console.log("No bits selected.");
    }
  };

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    padding: "20px",
  };

  const itemStyle = {
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    padding: "20px",
    textAlign: "center",
    fontSize: "1.2em",
    cursor: "move",
  };

  return (
    <div>
      <div style={containerStyle}>
        {blocks.map((block) => (
          <Block
            key={block.id} // Уникальный ключ для каждого блока
            id={block.id}
            bits={block.bits}
            letter={block.letter}
            index={blocks.findIndex((b) => b.id === block.id)} // Индекс блока
          />
        ))}
      </div>
      {/* Кнопка для передачи комбинации битов */}
      <button onClick={() => handleSendBits(selectedBits)}>Send Bits</button>
    </div>
  );
};

export default MyComponent;
