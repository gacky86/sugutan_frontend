import MainLayout from "@/components/layouts/MainLayout";
import ModalLayout from "@/components/layouts/ModalLayout";
import CardsList from "@/components/uis/cards/CardsList";

const Cards = () => {
  return (
    <div>
      <MainLayout childrenContent={<CardsList />} />
      <ModalLayout />
    </div>
  );
};

export default Cards;
