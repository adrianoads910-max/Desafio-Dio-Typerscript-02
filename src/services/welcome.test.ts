import { welcome } from "./welcome"

describe("welcome", () => {
  it("deve exibir um alert de boas vindas", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {})

    welcome()

    expect(alertMock).toHaveBeenCalledTimes(1)
    expect(alertMock).toHaveBeenCalledWith(
      "🎉 Bem-vindo! Login realizado com sucesso!"
    )

    alertMock.mockRestore()
  })
})