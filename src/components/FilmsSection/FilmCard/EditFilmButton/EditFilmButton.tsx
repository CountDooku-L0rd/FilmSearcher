import { Component } from "react";
import type { FilmsAPI } from "@yp-mentor/films-server-types";
import { connect } from "react-redux";
import {
  resetModal,
  setData,
  setIsEditModalOpen,
  type IFilm,
} from "../../../../store/modalSlice";
import styles from "./EditFilmButton.module.css";
import type { RootState } from "../../../../store/store";

interface EditFilmButtonProps {
  film: Awaited<ReturnType<FilmsAPI["getFilms"]>>["data"][number];
  isServerRequest: boolean;
  resetModal: () => void;
  setData: (film: IFilm) => void;
  setIsEditModalOpen: (isOpen: boolean) => void;
}

class EditFilmButtonComponent extends Component<EditFilmButtonProps> {
  handleClick = () => {
    const { resetModal, setData, setIsEditModalOpen, film } = this.props;
    resetModal();
    setData(film);
    setIsEditModalOpen(true);
  };

  render() {
    const { isServerRequest } = this.props;

    return (
      <button
        className={styles.button}
        onClick={this.handleClick}
        disabled={isServerRequest}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isServerRequest: state.main.isServerRequest,
});

const mapDispatchToProps = {
  resetModal,
  setData,
  setIsEditModalOpen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditFilmButtonComponent);
