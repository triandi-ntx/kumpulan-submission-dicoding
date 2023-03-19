import React, { Component } from 'react';
import { getInitialData, showFormattedDate } from '../utils/data';
import NoteList from '../components/NoteList';
import NoteInput from '../components/NoteInput';
import NoteSearch from '../components/NoteSearch';
import autoBindReact from 'auto-bind/react';

export default class NoteApps extends Component {
  constructor(props) {
    super(props);
    autoBindReact(this);

    this.state = {
      initialData: getInitialData(),
      data: getInitialData(),
    };
  }

  onResetData() {
    this.setState((prevState) => {
      return {
        ...prevState,
        data: this.state.initialData,
      };
    });
  }

  onDeleteHandler(id) {
    const data = this.state.data.filter((note) => note.id !== id);
    this.setState(() => {
      return {
        data: data,
        initialData: data,
      };
    });
  }

  onArchiveHandler(id) {
    // eslint-disable-next-line array-callback-return
    this.state.data.map((item) => {
      if (item.id === id) {
        item.archived = !item.archived;
        this.setState((prevState) => {
          return {
            data: [...prevState.data],
            initialData: [...prevState.data],
          };
        });
      }
    });
  }
  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      const data = [
        ...prevState.data,
        {
          id: +new Date(),
          title,
          body,
          createdAt: showFormattedDate(+new Date()),
          archived: false,
        },
      ];
      return {
        data: data,
        initialData: data,
      };
    });
  }

  onSearchingHandler(keyword) {
    this.onResetData();

    this.setState((prevState) => {
      return {
        ...prevState,
        data: prevState.data.filter((item) =>
          item.title.toLowerCase().includes(keyword.toLowerCase())
        ),
      };
    });
  }

  render() {
    return (
      <div className="container">
        <NoteInput addNote={this.onAddNoteHandler} />
        <NoteSearch onSearchingHandler={this.onSearchingHandler} />
        <h2 className="title">Note Active</h2>
        <NoteList
          items={this.state.data.filter((item) => !item.archived)}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
        />
        <h2 className="title">Note Archive</h2>
        <NoteList
          items={this.state.data.filter((item) => item.archived)}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
        />
      </div>
    );
  }
}
