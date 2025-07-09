import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  it("should add two numbers", () => {
    // approach a
    const logger = new LoggerService();
    spyOn(logger, "log");
    const calculator = new CalculatorService(logger);

    const result = calculator.add(2, 2);

    expect(result).toBe(4);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    // approach b
    const loggerMock = jasmine.createSpyObj("LoggerServiceMock", ["log"]);

    const calculator = new CalculatorService(loggerMock);
    const result = calculator.subtract(5, 3);

    expect(result).toBe(2);
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
  });
});
