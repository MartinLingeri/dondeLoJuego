import { useState } from "react";
import {
  Stack,
  Input,
  Heading,
  Button,
  IconButton,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { FaSun, FaMoon } from "react-icons/fa";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack spacing={4} alignItems="center" justifyContent="center" h="100vh">
      <Stack direction="row" spacing={6}>
        <Heading>¿Dónde Lo Juego?</Heading>
        <IconButton
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          variant="outline"
          borderRadius={9999}
          borderWidth={2}
          size="lg"
          onClick={toggleColorMode}
        ></IconButton>
      </Stack>
      <Box minWidth="md">
        <Stack direction="row" spacing={4}>
          <Input
            placeholder="DOOM Eternal"
            borderWidth={2}
            borderRadius="lg"
          ></Input>
          <Button
            bgColor={colorMode === "light" ? "green.200" : "blue.500"}
            borderColor={colorMode === "light" ? "green.400" : "blue.700"}
            _hover={{
              opacity: "0.8",
            }}
            size="md"
            paddingInline="8"
            borderWidth={2}
            borderRadius="lg"
          >
            Buscar
          </Button>
        </Stack>
      </Box>
      <Heading paddingTop={4} fontSize="lg" fontWeight="semibold">
        Funciona gracias a{" "}
      </Heading>
    </Stack>
  );
}

export default App;
