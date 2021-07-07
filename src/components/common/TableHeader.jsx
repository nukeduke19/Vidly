import React, { Component } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

class TableHeader extends Component {
  raisedSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <BiChevronUp />;
    return <BiChevronDown />;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <td
              key={column.path || column.key}
              className="clickable"
              onClick={() => this.raisedSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </td>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
