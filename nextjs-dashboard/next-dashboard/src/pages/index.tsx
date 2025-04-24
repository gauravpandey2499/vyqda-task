import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [search, users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">User Dashboard</h1>

      <Form className="d-flex justify-content-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "300px" }}
        />
      </Form>

      <Row>
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <Col key={user.id} xs={12} sm={6} md={4} className="mb-4">
              <Card className="shadow-sm h-100 border-0 rounded-4">
                <Card.Body>
                  <Card.Title className="fw-bold mb-3">{user.name}</Card.Title>
                  <Card.Text className="text-muted">
                    <i className="bi bi-envelope-fill me-2"></i>
                    {user.email}
                    <br />
                    <i className="bi bi-telephone-fill me-2"></i>
                    {user.phone}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center text-muted py-5 fs-5">No users found</div>
        )}
      </Row>

      <Pagination className="justify-content-center">
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx + 1}
            active={idx + 1 === currentPage}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
}
