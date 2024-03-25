import "./App.css";
import {
  Card,
  Container,
  Center,
  HStack,
  Button,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  InputLeftElement,
  Stack,
  Checkbox,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";
import { Logo } from "./assets/logo";
import { More } from "./assets/more";
import { Plus } from "./assets/plus";
import { Delete } from "./assets/delete";
import { Search } from "./assets/search";
import { CaretUp } from "./assets/CaretUp";
import { CaretDown } from "./assets/CaretDown";
import { Play } from "./assets/Play";
import { Pause } from "./assets/Pause";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [timeOptions] = useState([5, 30, 15]);
  const [selectedOption, setSelectedOption] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeOptions[selectedOption] * 60);

  const addNewTask = () => {
    if (!newTask.trim()) return;
    const news = { id: Date.now(), text: newTask };
    setTasks([...tasks, news]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addNewTask();
    }
  };

  const resetFilter = () => {
    setFilter("");
    setFilteredTasks([]);
  };

  const filterTasks = () => {
    const filtered = tasks.filter((task) =>
      task.text.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [tasks, timeOptions, isActive, timeLeft]);

  useEffect(() => {
    setTimeLeft(timeOptions[selectedOption] * 60);
  }, [selectedOption, timeOptions]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const changeTimeOption = (direction) => {
    if (!isActive) {
      setSelectedOption((prevIndex) => {
        if (direction === "up") {
          return prevIndex === 0 ? timeOptions.length - 1 : prevIndex - 1;
        } else {
          return prevIndex === timeOptions.length - 1 ? 0 : prevIndex + 1;
        }
      });
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(timeOptions[selectedOption] * 60);
  };

  return (
    <>
      <Center height="100vh">
        <HStack>
          <Card
            bgColor="#BFE9D8"
            border="1px solid #A8DDC7"
            h="xl"
            w={{ base: "xs", md: "lg" }}
            m="auto"
            p="1"
          >
            <Stack h="95%">
              <Container>
                <HStack justify="space-between">
                  <Box pt="2">
                    <Logo />
                  </Box>

                  <Popover onClose={resetFilter}>
                    <PopoverTrigger>
                      <Button bg="none" _hover={{ bg: "#A4D5C1" }}>
                        <More />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />

                      <PopoverBody>
                        <Stack spacing="2">
                          <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            color="#4D856E "
                          >
                            Buscar
                          </Text>
                          <InputGroup>
                            <Input
                              placeholder="Nome da tarefa"
                              sx={{
                                "::placeholder": {
                                  color: "#A5C6B9",
                                  fontWeight: "semibold",
                                },
                              }}
                              bgColor="#E5F5EF"
                              value={filter}
                              onChange={(e) => setFilter(e.target.value)}
                            />
                            <InputRightElement>
                              <Search />
                            </InputRightElement>
                          </InputGroup>
                          <HStack justify="end">
                            <Button
                              border="1px solid #A5C6B9"
                              color="#4D856E"
                              bgColor="#E5F5EF"
                              size="sm"
                              _hover={{ bgColor: "#4D856E", color: "white" }}
                              onClick={resetFilter}
                            >
                              Limpar
                            </Button>
                            <Button
                              border="1px solid #A5C6B9"
                              color="#4D856E"
                              bgColor="#E5F5EF"
                              size="sm"
                              _hover={{ bgColor: "#4D856E", color: "white" }}
                              onClick={filterTasks}
                            >
                              Filtrar
                            </Button>
                          </HStack>
                        </Stack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </HStack>
              </Container>

              <Stack h="100%" justify="space-between">
                <Stack justify="center" align="center" spacing="5">
                  <HStack spacing="0">
                    <Button
                      bg="none"
                      _hover={{ bg: "none" }}
                      onClick={() => changeTimeOption("down")}
                    >
                      <CaretUp />
                    </Button>
                    <Stack spacing="1" align="center" justify="center">
                      <Box w="200px" bgColor="#4D856E" p="2" borderRadius="8">
                        <Text
                          textAlign="center"
                          fontSize="6xl"
                          fontWeight="bold"
                          color="white"
                        >
                          {Math.floor(timeLeft / 60)}:
                          {String(timeLeft % 60).padStart(2, "0")}
                        </Text>
                      </Box>
                      <HStack spacing="1">
                        <Button
                          bgColor="#4D856E"
                          color="white"
                          onClick={toggleTimer}
                          size="sm"
                          pl="4"
                          pr="5"
                        >
                          {isActive ? (
                            <HStack>
                              <Pause />
                              <Text fontSize="sm">PAUSE</Text>
                            </HStack>
                          ) : (
                            <HStack>
                              <Play />
                              <Text fontSize="sm">START</Text>
                            </HStack>
                          )}
                        </Button>

                        <Button
                          bgColor="#4D856E"
                          color="white"
                          size="sm"
                          pl="5"
                          pr="5"
                          onClick={resetTimer}
                        >
                          RESETAR
                        </Button>
                      </HStack>
                    </Stack>
                    <Button
                      bg="none"
                      _hover={{ bg: "none" }}
                      onClick={() => changeTimeOption("up")}
                    >
                      <CaretDown />
                    </Button>
                  </HStack>
                  <Stack
                    w="100%"
                    spacing="2"
                    overflowY="auto"
                    overflowX="hidden"
                    maxHeight="235px"
                    maxH={{ base: "330px", md: "235px" }}
                  >
                    {(filteredTasks.length > 0 ? filteredTasks : tasks).map(
                      (task) => (
                        <Container key={task.id}>
                          <Card bg="#8BC0AA" border="none">
                            <HStack justify="space-between">
                              <HStack pl="2">
                                <Checkbox
                                  onChange={() => deleteTask(task.id)}
                                  colorScheme="green"
                                />
                                <Text
                                  maxW={{ base: "20ch", md: "40ch" }}
                                  textOverflow="ellipsis"
                                  whiteSpace="nowrap"
                                  overflow="clip"
                                >
                                  {task.text}
                                </Text>
                              </HStack>
                              <HStack pr="1" spacing="1">
                                <Button
                                  bg="none"
                                  _hover={{ bg: "#A4D5C1" }}
                                  onClick={() => deleteTask(task.id)}
                                >
                                  <Delete />
                                </Button>
                              </HStack>
                            </HStack>
                          </Card>
                        </Container>
                      )
                    )}
                  </Stack>
                </Stack>

                <Container>
                  <InputGroup>
                    <InputLeftElement>
                      <Plus />
                    </InputLeftElement>
                    <Input
                      placeholder="Adicionar tarefa"
                      sx={{
                        "::placeholder": {
                          color: "#4D856E",
                          fontWeight: "semibold",
                        },
                      }}
                      bgColor="#8BC0AA"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </InputGroup>
                </Container>
              </Stack>
            </Stack>
          </Card>
        </HStack>
      </Center>
    </>
  );
}

export default App;
