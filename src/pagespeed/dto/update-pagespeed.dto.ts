import { PartialType } from '@nestjs/mapped-types';
import { CreatePagespeedDto } from './create-pagespeed.dto';

export class UpdatePagespeedDto extends PartialType(CreatePagespeedDto) {}
