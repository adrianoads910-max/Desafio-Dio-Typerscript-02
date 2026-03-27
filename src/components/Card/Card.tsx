import { Input } from "@chakra-ui/react"
import { Button } from "../Button/Button"
import { welcome } from "../../services/welcome"

export const Card = () => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        Bem-vindo
      </h1>
      <p className="text-gray-400 text-center text-sm mb-8">
        Faça login para continuar
      </p>

      <div className="flex flex-col gap-4 mb-6">
        <Input
          placeholder="Email"
          type="email"
          variant="filled"
          bg="gray.800"
          borderColor="gray.700"
          color="white"
          _placeholder={{ color: "gray.500" }}
          _hover={{ bg: "gray.700" }}
          _focus={{ bg: "gray.800", borderColor: "purple.500" }}
        />
        <Input
          placeholder="Senha"
          type="password"
          variant="filled"
          bg="gray.800"
          borderColor="gray.700"
          color="white"
          _placeholder={{ color: "gray.500" }}
          _hover={{ bg: "gray.700" }}
          _focus={{ bg: "gray.800", borderColor: "purple.500" }}
        />
      </div>

      <Button label="Entrar" onClick={welcome} />

      <p className="text-gray-600 text-center text-xs mt-6">
        Não tem conta?{" "}
        <span className="text-purple-400 cursor-pointer hover:text-purple-300">
          Cadastre-se
        </span>
      </p>
    </div>
  )
}

export default Card