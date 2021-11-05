import { context, RNG, u128 } from "near-sdk-as";
import { AccountID, FEE, RefCode, Timestamp } from "../utils";

@nearBindgen
export class Donation {
  refCode: RefCode;
  amount: u128;
  createAt: Timestamp;

  constructor(
    amount: u128,
    public createdBy: AccountID,
  ) {
    this.createAt = context.blockTimestamp;
    this.refCode = this.generateRefCode();
    
    // Take a FEE of each donation
    this.amount = u128.add(amount, FEE);
  }

  getRefCode(): RefCode {
    return this.refCode;
  }

  /**
   * Generates a new id and checks if ID already exists
   * if ID exists a new ID will be generated by calling the function again
   * @returns RefCode
   */
  private generateRefCode(): RefCode {
    const roll = new RNG<u32>(1, u32.MAX_VALUE);
    const id = "BD-" + roll.next().toString();

    return id;
  }
}