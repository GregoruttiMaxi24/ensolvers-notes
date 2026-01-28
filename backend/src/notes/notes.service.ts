import { Injectable, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepo: Repository<Note>,
  ) {}

  findByUser(userId: number) {
    return this.notesRepo.find({ where: { userId } });
  }

  findActiveByUser(userId: number) {
    return this.notesRepo.find({ where: { archived: false, userId } });
  }

  findArchivedByUser(userId: number) {
    return this.notesRepo.find({ where: { archived: true, userId } });
  }

  create(note: Partial<Note>) {
    const newNote = this.notesRepo.create(note);
    return this.notesRepo.save(newNote);
  }

  async update(id: number, data: Partial<Note>, userId: number) {
    const note = await this.notesRepo.findOne({ where: { id, userId } });
    if (!note) throw new ForbiddenException('Note not found or unauthorized');
    return this.notesRepo.update(id, data);
  }

  async remove(id: number, userId: number) {
    const note = await this.notesRepo.findOne({ where: { id, userId } });
    if (!note) throw new ForbiddenException('Note not found or unauthorized');
    return this.notesRepo.delete(id);
  }

  async toggleArchive(id: number, userId: number) {
    const note = await this.notesRepo.findOne({ where: { id, userId } });
    if (!note) throw new ForbiddenException('Note not found or unauthorized');
    note.archived = !note.archived;
    return this.notesRepo.save(note);
  }

  findByCategoryAndUser(category: string, userId: number) {
    return this.notesRepo.find({ where: { category, userId } });
  }

  findByCategoryAndUserWithArchived(category: string, userId: number, archived?: boolean) {
    if (archived === undefined) {
      return this.notesRepo.find({ where: { category, userId } });
    }
    return this.notesRepo.find({ where: { category, userId, archived } });
  }

  // Legacy methods for backward compatibility
  findAll() {
    return this.notesRepo.find();
  }

  findActive() {
    return this.notesRepo.find({ where: { archived: false } });
  }

  findArchived() {
    return this.notesRepo.find({ where: { archived: true } });
  }

  findByCategory(category: string) {
    return this.notesRepo.find({ where: { category } });
  }
}