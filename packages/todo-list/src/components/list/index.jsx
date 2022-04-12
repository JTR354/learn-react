const List = ({ data, onDel, onSelect }) => {
  console.log(List.name, 'run')
  return (
    <ul>
      {data.map((it) => (
        <li key={it.id}>
          <label style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <input
                type="checkbox"
                defaultChecked={it.checked}
                onClick={() => {
                  onSelect(it);
                }}
              />
              {it.val}
            </div>

            <button
              style={{ alignContent: "flex-end" }}
              onClick={(e) => {
                e.stopPropagation();
                onDel(it);
              }}
            >
              删除
            </button>
          </label>
        </li>
      ))}
    </ul>
  );
};

function Item(props) {
  const { val, onDel, checked, onSelect } = props;
  return (
    <li>
      <label style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <input
            type="checkbox"
            defaultChecked={checked}
            value={val}
            onClick={() => {
              onSelect(props);
            }}
          />
          {val}
        </div>

        <button
          style={{ alignContent: "flex-end" }}
          onClick={(e) => {
            e.stopPropagation();
            onDel(props);
          }}
        >
          删除
        </button>
      </label>
    </li>
  );
}

export default List;
