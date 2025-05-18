import { z } from "zod";
import { DebitedSuccessfulSchema } from "@domain/models/debitedSucess";

export const DebitResponseDTO = DebitedSuccessfulSchema.extend({});

export type DebitResponseDTOtype = z.infer<typeof DebitResponseDTO>;