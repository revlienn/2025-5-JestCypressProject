import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  let calculator: CalculatorService, loggerSpy: any;
  beforeEach(() => {
    console.log("*** beforeEach ***");
    loggerSpy = jasmine.createSpyObj("LoggerServiceMock", ["log"]);
    calculator = new CalculatorService(loggerSpy);
  });
  it("should add two numbers", () => {
    console.log("*** ADD ***");
    const result = calculator.add(2, 2);

    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    console.log("*** SUBTRACT ***");
    const result = calculator.subtract(5, 3);

    expect(result).toBe(2);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
