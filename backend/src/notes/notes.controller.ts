import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('notes')
@UseGuards(JwtGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll(@Request() req, @Query('archived') archived?: string, @Query('category') category?: string) {
    const archivedFilter = archived === 'true' ? true : archived === 'false' ? false : undefined;
    
    if (category) {
      return this.notesService.findByCategoryAndUserWithArchived(category, req.user.userId, archivedFilter);
    }

    if (archivedFilter !== undefined) {
      return archivedFilter 
        ? this.notesService.findArchivedByUser(req.user.userId)
        : this.notesService.findActiveByUser(req.user.userId);
    }

    return this.notesService.findByUser(req.user.userId);
  }

  @Get('active')
  findActive(@Request() req) {
    return this.notesService.findActiveByUser(req.user.userId);
  }

  @Get('archived')
  findArchived(@Request() req) {
    return this.notesService.findArchivedByUser(req.user.userId);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string, @Request() req) {
    return this.notesService.findByCategoryAndUser(category, req.user.userId);
  }

  @Post()
  create(@Body() note: Partial<Note>, @Request() req) {
    return this.notesService.create({ ...note, userId: req.user.userId });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: Partial<Note>, @Request() req) {
    return this.notesService.update(id, data, req.user.userId);
  }

  @Patch(':id/toggle')
  toggleArchive(@Param('id') id: number, @Request() req) {
    return this.notesService.toggleArchive(id, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Request() req) {
    return this.notesService.remove(id, req.user.userId);
  }
}