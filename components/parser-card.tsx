"use client"

import { useState, useCallback } from "react"
import { Upload, FileText, Play, Square, RotateCcw, CheckCircle2, Loader2, Building2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const banks = [
  { value: "maybank", label: "Maybank" },
  { value: "cimb", label: "CIMB Bank" },
  { value: "publicbank", label: "Public Bank" },
  { value: "rhb", label: "RHB Bank" },
  { value: "hongleong", label: "Hong Leong Bank" },
  { value: "ambank", label: "AmBank" },
  { value: "bankislam", label: "Bank Islam" },
  { value: "ocbc", label: "OCBC Bank" },
  { value: "uob", label: "UOB Bank" },
  { value: "hsbc", label: "HSBC" },
  { value: "standardchartered", label: "Standard Chartered" },
  { value: "affin", label: "Affin Bank" },
  { value: "alliancebank", label: "Alliance Bank" },
  { value: "bankrakyat", label: "Bank Rakyat" },
  { value: "bsn", label: "BSN" },
]

type ProcessingStatus = "idle" | "processing" | "completed" | "error"

interface UploadedFile {
  name: string
  size: number
  id: string
}

interface ParserCardProps {
  isVisible?: boolean
}

export function ParserCard({ isVisible = true }: ParserCardProps) {
  const [selectedBank, setSelectedBank] = useState<string>("")
  const [companyName, setCompanyName] = useState("")
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [status, setStatus] = useState<ProcessingStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
      .filter(file => file.type === "application/pdf")
      .map(file => ({
        name: file.name,
        size: file.size,
        id: Math.random().toString(36).substring(7)
      }))
    
    setFiles(prev => [...prev, ...droppedFiles])
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
        .filter(file => file.type === "application/pdf")
        .map(file => ({
          name: file.name,
          size: file.size,
          id: Math.random().toString(36).substring(7)
        }))
      
      setFiles(prev => [...prev, ...selectedFiles])
    }
  }, [])

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }, [])

  const handleStart = useCallback(() => {
    if (!selectedBank || files.length === 0) return
    
    setStatus("processing")
    setProgress(0)
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setStatus("completed")
          return 100
        }
        return prev + 10
      })
    }, 500)
  }, [selectedBank, files])

  const handleStop = useCallback(() => {
    setStatus("idle")
    setProgress(0)
  }, [])

  const handleReset = useCallback(() => {
    setSelectedBank("")
    setCompanyName("")
    setFiles([])
    setStatus("idle")
    setProgress(0)
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const statusConfig = {
    idle: { label: "Ready", color: "bg-muted text-muted-foreground", icon: null },
    processing: { label: "Processing", color: "bg-primary/10 text-primary", icon: <Loader2 className="h-3 w-3 animate-spin" /> },
    completed: { label: "Completed", color: "bg-green-100 text-green-700", icon: <CheckCircle2 className="h-3 w-3" /> },
    error: { label: "Error", color: "bg-destructive/10 text-destructive", icon: null },
  }

  if (!isVisible) {
    return (
      <Card className="max-w-3xl mx-auto shadow-lg border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Bank Statement Parser</CardTitle>
          <CardDescription>Click &quot;Get Started&quot; above to begin parsing your bank statements</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="max-w-3xl mx-auto shadow-xl border-border/50 bg-card">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              Bank Statement Parser
            </CardTitle>
            <CardDescription className="mt-2">
              Upload one or more bank statement PDFs to extract transactions
            </CardDescription>
          </div>
          <div className={cn(
            "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
            statusConfig[status].color
          )}>
            {statusConfig[status].icon}
            {statusConfig[status].label}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Bank Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            Select Bank Format
          </label>
          <Select value={selectedBank} onValueChange={setSelectedBank} disabled={status === "processing"}>
            <SelectTrigger className="h-12 bg-background">
              <SelectValue placeholder="Choose your bank..." />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank) => (
                <SelectItem key={bank.value} value={bank.value}>
                  {bank.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Upload className="h-4 w-4 text-muted-foreground" />
            Upload PDF Files
          </label>
          <div
            className={cn(
              "relative rounded-xl border-2 border-dashed transition-all duration-200",
              isDragging 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50 hover:bg-muted/30",
              status === "processing" && "opacity-50 pointer-events-none"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center py-10 px-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                Drag and drop files here
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Limit 200MB per file • PDF only
              </p>
              <label>
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileSelect}
                  disabled={status === "processing"}
                />
                <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                  <span>Browse files</span>
                </Button>
              </label>
            </div>
          </div>

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="space-y-2 mt-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    disabled={status === "processing"}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Company Name <span className="text-muted-foreground font-normal">(optional override)</span>
          </label>
          <Input
            placeholder="Enter company name..."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            disabled={status === "processing"}
            className="h-12 bg-background"
          />
        </div>

        {/* Progress Bar */}
        {status === "processing" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Processing files...</span>
              <span className="font-medium text-foreground">{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={handleStart}
            disabled={!selectedBank || files.length === 0 || status === "processing"}
            className="flex-1 h-12 gap-2"
          >
            <Play className="h-4 w-4" />
            Start Processing
          </Button>
          <Button
            variant="outline"
            onClick={handleStop}
            disabled={status !== "processing"}
            className="sm:w-32 h-12 gap-2"
          >
            <Square className="h-4 w-4" />
            Stop
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={status === "processing"}
            className="sm:w-32 h-12 gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Completion Message */}
        {status === "completed" && (
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800">Processing Complete</p>
              <p className="text-xs text-green-700">
                Successfully extracted transactions from {files.length} file{files.length > 1 ? "s" : ""}.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
