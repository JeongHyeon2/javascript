const talbeHeader = ["name", "email", "phone", "website"];
export default function UserTable({ users, setClickedUserId }) {
  return (
    <table>
      <thead>
        <tr>
          {talbeHeader.map((head) => (
            <th style={{ border: "1px solid black" }}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            data-userid={user.id}
            onClick={(e) => {
              setClickedUserId(parseInt(e.currentTarget.dataset.userid));
            }}
          >
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
